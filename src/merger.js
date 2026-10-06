import fs from 'fs'
import path from 'path'
import process from 'process'

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import Matter from '@11ty/gray-matter'
import Lorry from '@jessetraynham/lorry'
import * as peggy from "peggy"
import { createSyncFn } from 'synckit'
import walk from 'walk-sync'

/**
 * Class for merging text using plugins and tags.
 */
class Engine {
	
	// ENV
	env = {}
	
	// PLUGINS/TAGS
	plugins = {}                                          // BASE PLUGINS
	tags = {}                                             // ALL TAGS INCLUDING ALIASES
	
	// OPTIONS
	options = {
		
		debug: false,                                     // Fill the console with debug messages.
		
		delimiters: {
			default: ['[', ']'],                          // DEFAULT DELIMITERS
			raw: {},                                      // RAW START/END DELIMITERS
			esc: {},		                              // HTML ESCAPED START/END DELIMITERS
			enc: {}		                                  // REGEX ESCAPED START/END DELIMITERS
		},
		
		flush_comments: true,                             // REMOVE COMMENTS BEFORE PROCESSING
		removeTabs: true,                                 // REMOVE LEADING TABS BEFORE PROCESSING
		
		paths: {
			app: '',                                      // Path to the root of the app.
			src: dirname(fileURLToPath(import.meta.url)), // Path to src directory
			plugins: 'plugins',                           // CUSTOM PLUGINS DIR FROM APP ROOT
			views: '',                                    // Path to the views directory
			
		}
		
	}
	
	// OTHER
	global_payload    = {}         // DEFAULT PAYLOAD
	
	/**
	 * Constructor for Engine class.
	 * @param {Object} options - Optional settings for the merger.
	 */
	constructor(opt = {}) {
		
		let options = this.options
		
		// POPULATE OPTIONS
		options.paths.app = this._getAppRoot()
		options.removeTabs = opt.removeTabs !== false
		options.flush_comments = opt.flush_comments !== false
		options.debug = opt.debug == true ? true : false
//		options.debug = true
		options.paths.plugins = opt.plugins ? opt.plugins : 'plugins'
		options.paths.views = path.join( options.paths.app, opt.views ? opt.views : 'views' )
		
		this.setDelimiters(opt.delimiters)
		
	}
	
	// Run plugins start up method.
	async initializePlugins(plugins) {
		for (const key in plugins) {
			const plugin = plugins[key]
			if (typeof plugin.onStartup === 'function') {
				await plugin.onStartup()
			}
		}
	}

	detectEnvironment() {
		// If 'window' is undefined, we're in Node; else, browser.
		if (typeof window === 'undefined') {
			this.env.platform = 'node'
		} else {
			this.env.platform = 'browser'
		}
	}
	
	/**
	 * Initialize the Engine by loading default and custom plugins.
	 */
	async init() {
		
		// DETECT ENVIRONMENT
		this.detectEnvironment()
		
		// LOAD DEFAULT PLUGINS
		const pluginDirectory = join(this.options.paths.src, 'plugins')
		await this._loadPluginsDir(pluginDirectory, 'Core')
		
		// LOAD CUSTOM PLUGINS
		let custom = path.join(this.options.paths.app, this.options.paths.plugins)
		await this._loadPluginsDir(custom, 'Custom')
		
		//await this.initializePlugins(this.plugins)
		await this.initializePlugins(this.tags)
		
//		console.log('PLUGINS::', this.plugins)
		
		this.peggy_setup()
		
	}
	
	// !PUBLIC METHODS
	
	/**
	 * Register one or more aliases for a tag.
	 * @param {string} tag - Tag to be aliased.
	 * @param {Array|string} alias - Alias or aliases for the tag.
	 */
	alias = (tag, alias) => {
		if(!Array.isArray(alias)) { alias = [alias] }
		//alias.forEach( alias => {
		//	this.tags[alias] = {...this.plugins[tag], alias: alias}
		//})
		alias.forEach(aliasName => {
			this.tags[aliasName] = {
				...this.plugins[tag],
				alias: aliasName,
				variant: 'alias' // Mark as alias
			}
		})
	}
	
	
	fetchSyncJSON(uri) {
		
		let validate = this.validateURL(uri)
		
		if(validate.err){
			return validate
		}
		
		const workerPath = join(this.options.paths.src, 'workers', 'worker_fetch_json.js')
		
		const syncFn = createSyncFn(workerPath)
		const results = syncFn(uri)
		
		return results
		
	}
	
	
	validateURL(uri){
		
		/*
			TODO:
			Return valid/cleaned up url from URL().href?
		*/
		
		let location
		let lorry = new Lorry()
		
		try {
			location = new URL(uri)
		} catch (e) {
			return lorry.Throw(400, `ERROR: Invalid url › ${uri}`)
		}
		
		//let forbidden_domains = ['localhost', '127.0.0.1', '[::1]']
		let forbidden_domains = ['localhost', '[::1]']
		let allowed_protocols = ['http:', 'https:']
		
		if(forbidden_domains.includes(location.hostname)){
			return lorry.Throw(403, `ERROR: Forbidden domain › ${location.host}`)
		}
		
		if(!allowed_protocols.includes(location.protocol)){
			return lorry.Throw(403, `ERROR: Forbidden protocol › ${location.protocol}`)
		}
		
		return lorry
		
	}
	
	
	peggy_setup(){
		/*
		this.tagsByKind = { single: [], container: [] }
		
		for (let tag in this.tags) {
			if(this.tags[tag].kind == 'container'){
				this.tagsByKind.container.push(tag)
			} else {
				this.tagsByKind.single.push(tag)
			}
		}
		
		console.log(this.tagsByKind)
		*/
		const grammarPath = join(this.options.paths.src, 'grammar.peggy')
		
		const grammar = fs.readFileSync(grammarPath, 'utf-8')
		
		this.parser = peggy.default.generate(
			grammar, 
			{
				trace: false, 
				grammarSource: 'grammar.peggy'
			}
		)
		
	}
	
	peggy(template, payload){
		
		let parsed
		let out = []
		
		try {
			parsed = this.parser.parse(
				template,
				{
					DEBUG: this.options.debug,
					payload, 
//					tagsByKind: this.tagsByKind, 
					tags: this.tags, 
					engine: this,
					grammarSource: 'grammar.peggy',
					tracer: {trace: (items) => console.log('Trace items:', items)}
				}
			)
		} catch (error) {
			console.log('THERE WAS AN ERROR::', error.toString())
			return error.toString()
		}
		
		parsed.forEach(item => {
			out.push(item.render)
		})
		
		return out.join('')
		
	}
	
	/**
	 * Merge a template with a payload.
	 * @param {string} template - Template to be merged.
	 * @param {Object} payload - Payload to be used for merging.
	 * @returns {string} Merged template.
	 */
	merge(template, payload) {
		
		// SET PAYLOAD TO GLOBAL PAYLOAD AND MERGE PAYLOAD.
		payload = {...this.global_payload, ...payload}
		
		let {start, end} = this.options.delimiters.raw
		
		payload ??= { _synth: {} }
		payload._synth ??= {}
		payload._synth.views ??= this.options.paths.views
		
		let matter = Matter(template)
		
		template = matter.content
		payload.page = matter.data
		
		// IF HAS IMPORTJSON
		if(payload.page.importJSON){
			
			const importArray = Array.isArray(payload.page.importJSON)
			? payload.page.importJSON
			: [payload.page.importJSON]
			
			importArray.forEach(item => {
				if(item.includes(' using ')){
					template = `${start}importJSON: ${item}${end}${template}`
				} else {
					template = `${start}importJSON: '${item}'${end}${template}`
				}
			})
			
		}
		
		if('flush_comments' in payload._synth){
			this.options.flush_comments = payload._synth.flush_comments
		}
		
		//IF HAS LAYOUT
		if(payload.page.layout || payload.layout){
			template = `${start}layout: '${payload.page.layout}'${end}${template}${start}/layout${end}`
		}
		
		// REMOVE COMMENTS
		template = this.removeComments(template)
		
		// REMOVE LEADING TABS
		template = this.removeLeadingTabs(template)
		
		// ALLOW PAGE.MD TO TRUMP _SYNTH.MD VALUE.
		if(payload.page.md === false){
			payload._synth.md = false
			payload._synth.markdown = false
		}
		
		// IF MARKDOWN
		if(payload._synth.md || payload.page.md){
			template = `${start}markdown${end}${template}${start}/markdown${end}`
		}
		
		// IF CACHE
		if(payload.page.cache){
			template = `${start}cache${end}${template}${start}/cache${end}`
		}
		
		// PROCESS
		let processed = this.process(template, payload)
		
		let { raw, esc } = this.options.delimiters
		
		return processed
			.split(esc.start).join(raw.start)
			.split(esc.end).join(raw.end)
		
	}
	
	removeComments(text) {
		
		if(!this.options.flush_comments){ return text }
		
		// Remove single-line comments
		text = text.replace(/(?<!:)(\/\/[^\n]*)/g, '')
		
		// Remove multi-line C-style comments
		text = text.replace(/\/\*[\s\S]*?\*\//g, '')
		
		// Remove multi-line HTML comments
		text = text.replace(/<!--[\s\S]*?-->/g, '')
		
		return text
		
	}
	
	removeLeadingTabs(text) {
		if(!this.options.removeTabs){ return text }
		return text.replace(/^\t+/gm, '')
	}
	
	
	
	/**
	 * Merge a file with a payload.
	 * @param {string} filePath - Path of the file to be merged.
	 * @param {Object} payload - Payload to be used for merging.
	 * @returns {Promise<string>} Merged file.
	 */
	//async mergeFile(filePath, payload) {
	mergeFile(filePath, payload) {
		
		payload ??= { _synth: {} };
		payload._synth ??= {};
		payload._synth.views ??= this.options.paths.views;
		
		let thePath = path.join(payload._synth.views, filePath)
		
		let parsedPath = path.parse(thePath)
		
		// Declare as markdown if extension is .md and _synthmd is not specifically false.
		if(parsedPath.ext === '.md' && payload._synth.md !== false){

			payload._synth.md = true
		}
		
		// IF EXPRESS, FILEPATH IS ALREADY FULL PATH
		if(payload._synth.isExpress){
			thePath = filePath
		}
		
		if(!fs.existsSync(thePath)){
			let nicePath = thePath.replace(this._getAppRoot(), '')
			console.log(`ERROR: Merge path "${nicePath}" does not exist`)
			return `ERROR: Merge path "${nicePath}" does not exist`
		}
		
		// MERGE
		const template = fs.readFileSync(thePath, 'utf-8')
		//return await this.merge(template, payload)
		return this.merge(template, payload)
		
	}
	
	// CAN BE CALLED BY PLUGINS INSTEAD OF MERGE().
	
	/**
	 * Process a template using a given payload.
	 * 
	 * @param {string} template - The template to be processed. This should contain the structures that need to be replaced with payload values.
	 * @param {Object} payload - The object containing the data that will replace the structures in the template.
	 * 
	 * @returns {string} The processed template with all the structures replaced by the corresponding data from the payload.
	 */
	process(template, payload) {
		
		// DUE TO NEWER CODE, THIS FUNCTION MAY NOT BE NEEDED.
		// WE SHOULD PROBABLY JUST CALL THIS.PEGGY() DIRECTLY INSTEAD.
		
		// let processed
		// processed = this.peggy(template, payload)
		// return processed
		
		return this.peggy(template, payload)
		
	}

	pluginSettings(pluginName, settingsObj) {
		
		// Check if the plugin exists
		if (!this.tags[pluginName]) {
			console.error(`Plugin ${pluginName} does not exist.`); 
			return;
		}
	
		// If the plugin doesn't have a settings object, create one
		if (!this.tags[pluginName].settings) {
			this.tags[pluginName].settings = {};
		}
	
		// If settingsObj is provided, merge the existing settings with the new ones
		if(settingsObj) {
			this.tags[pluginName].settings = { ...this.tags[pluginName].settings, ...settingsObj };
		}
	
		// Return the settings object
		return this.tags[pluginName].settings;
	}

	
	
	/**
	 * Executes a specific plugin with the provided arguments.
	 *
	 * @param {string} name - The name of the plugin to be run.
	 * @param {Object} args - The arguments to be passed to the plugin. It should include:
	 *  - content: The content to be processed by the plugin.
	 *  - params: The parameters required by the plugin for its operation.
	 *  - payload: The data that the plugin may require for its operation.
	 *
	 * @returns {*} The result of the plugin operation.
	 *
	 * @throws {Error} If the plugin specified by the "name" parameter does not exist.
	 */
	runPlugin(name, args) {
		
		// Check if the plugin exists
		if (this.tags[name]) {
			
			const req = {
				cargo: args.cargo,
				content: args.content,
				params: args.params,
				payload: args.payload,
				engine: this
			}
			
			// Run the plugin
			const result = this.tags[name].processor(req)
			
			// Return the result
			return result
			
		} else {
			
			return `Plugin "${name}" does not exist.`
			
		}
	}
	
	/**
	 * Set delimiters for tags.
	 * @param {Object} options - Options for setting delimiters.
	 */
	setDelimiters(delimiters = this.options.delimiters.default){
		
		let [ start, end ] = delimiters
		let del = this.options.delimiters
		
		del.raw = { start: start, end: end }
		del.enc = { start: this.encodeAsHtmlEntity(start), end: this.encodeAsHtmlEntity(end) }
		del.esc = {
			start: start.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'),
			end:   end.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
		}
		
	}
	
	encodeAsHtmlEntity(str) {
		return Array.from(str, ch => `&#${ch.codePointAt(0)};`).join('');
	}
	
	/**
	 * Registers one or more plugins to be used by the instance.
	 *
	 * @param {...Object} plugins - The plugins to be registered. Each plugin should be an object with:
	 *  - name: The unique identifier for the plugin.
	 *  - aliases: (optional) Additional names by which the plugin can be accessed.
	 * Other properties of the plugin object depend on the specific plugin implementation.
	 *
	 * This method also assigns aliases for each plugin, if they are provided.
	 */
	use = (...plugins) => {
		plugins.forEach((plugin) => {
			plugin.variant = 'original';
			this.plugins[plugin.name] = plugin
			this.tags[plugin.name] = plugin
			if(plugin.aliases){
				this.alias(plugin.name, plugin.aliases)
			}
		})
	}
	

	// !PRIVATE METHODS
	
	/**
	 * Get the application root directory.
	 * @returns {string} Path of the application root directory.
	 */
	_getAppRoot = () => {
		
		/*
			Starting at the current working directory, this method locates and returns 
			the path of the closest parent directory containing 'node_modules', 
			or null if none found.
		*/
		
		let currentPath = process.cwd()
		
		while (currentPath !== path.parse(currentPath).root) {
			const dirListing = fs.readdirSync(currentPath)
			if (dirListing.includes('node_modules')) { return currentPath }
			currentPath = path.dirname(currentPath)
		}
		
		return null
		
	}
	
	/**
	 * Load all plugins from a directory.
	 * @param {string} directoryPath - Path of the directory to load plugins from.
	 * @param {string} type - Type of plugins being loaded.
	 */
	async _loadPluginsDir(pluginDirectory, suite) {
		
		if(!fs.existsSync(pluginDirectory)){
			if(this.options.debug){ console.log(`Plugin directory does not exist: ${pluginDirectory}`) }
			return 'Plugin directory does not exist.'
		}
		
		const pluginFiles = walk(pluginDirectory, {
			globs: ['**/*.js'],
			ignore: ['**/_*'],
		})
		
		const pluginImports = pluginFiles.map((file) => import(join(pluginDirectory, file)))
		const plugins = await Promise.all(pluginImports)
		
		for (const pluginModule of plugins) {
			const plugin = pluginModule.default
			plugin.path = pluginDirectory.replace(this._getAppRoot(), '')
			plugin.suite = suite
			this.use(plugin)
		}
		
	}

}

/* c8 ignore start */
async function expressTextSynthEngine(filePath, options, callback) {
	
	if(!options._synth) {
		options._synth = {}
	}	
	
	// SET _SYNTH VALUES
	options._synth.isExpress = true
	options._synth.views = options.settings?.views
	options._synth.template = filePath

	// Merge the template with the provided data
	const mergedText = await options.textSynth.mergeFile(filePath, options)

	// Call the callback with the merged text
	callback(null, mergedText)
	
}
/* c8 ignore end */

/* c8 ignore start */
async function expressMote(app, opt = {}) {
	const textSynth = await initEngine(opt)

	const extensions = opt.extensions || ['md', 'lay']
	const viewEngine = Object.prototype.hasOwnProperty.call(opt, 'viewEngine')
		? opt.viewEngine
		: (Array.isArray(extensions) ? extensions[0] : extensions)

	if (!app || typeof app.engine !== 'function') {
		throw new Error('expressMote requires an Express app instance')
	}

	const extList = Array.isArray(extensions) ? extensions : [extensions]

	extList.forEach((ext) => {
		app.engine(ext, (filePath, options, callback) => {
			expressTextSynthEngine(filePath, { ...options, textSynth }, callback)
		})
	})

	if (viewEngine) {
		app.set('view engine', viewEngine)
	}

	return textSynth
}
/* c8 ignore end */


// CREATE AND INIT ENGINE.
async function initEngine(opt) {
	const engine = new Engine(opt)
	await engine.init()
	return engine
}


export default initEngine // TextSynth
export { initEngine, expressTextSynthEngine, expressMote, initEngine as Mote }
