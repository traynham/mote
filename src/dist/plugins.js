// AUTO-GENERATED. DO NOT EDIT.
export const plugins = {
	count: {
	name: `count`,
	author: `Jesse Traynham`,
	category: `Array/Text`,
	description: `Counts the number of elements in an array, characters in a string, or occurrences of a specified value in the input.`,
	kind: `single`,
	version: `1.0.0`,
	docs: {
	content: [{
	name: `content`,
	type: `any`,
	required: true,
	description: `The input where the count is performed. This can be a string or an array.`
}],
	examples: [{
	input: `[count 'This is 10']`,
	output: `10`,
	note: `Counts the characters in a string.`
}, {
	input: `[count found_array]`,
	output: `15`,
	note: `Counts the elements in an array, assuming there are 15 array items.`
}, {
	input: `[count('t') 'This is a test']`,
	output: `2`,
	note: `Counts the occurrences of the letter "t" in the string.`
}],
	params: [{
	name: `query`,
	type: `string`,
	required: false,
	description: `The specific value to count in the input. If not provided, all elements or characters are counted.`
}],
	syntax: `[count property], [count(query) property]`,
	type: [`string`, `array`]
},
	processor(req) {
		
		let q = req.params[0]
		let content = req.content
		
		if(!Array.isArray(content) && typeof content !== 'string'){
			return req.content
		}
		
		if (q && Array.isArray(content)) {
			return content.filter(el => el === q).length
		}
		
		if (q && typeof content === 'string') {
			return (content.match(new RegExp(q, 'g'))).length
		}
		
		return content.length
		
	},
	variant: `original`
},
	join: {
	name: `join`,
	author: `Jesse Traynham`,
	category: `Array/Text`,
	description: `Joins the elements of an array with a specified separator. If no separator is specified, the elements are joined with a comma followed by a space.`,
	kind: `single`,
	version: `1.0.0`,
	docs: {
	content: [{
	name: `content`,
	type: `array`,
	required: true,
	description: `The array to be joined.`
}],
	params: [{
	name: `delimiter`,
	type: `string`,
	required: false,
	description: `The string used to separate the elements in the array. If not provided, a comma and a space are used as the default.`
}],
	examples: [],
	syntax: `[join(delimiter) array]`,
	type: [`array`]
},
	settings: {
	delimiter: `, `
},
	processor(req){
		
		if (typeof req.content === 'string') {
			return req.content
		}
		
		let delimiter = req.params[0] || this.settings.delimiter
		
		return req.content?.join(delimiter)
		
	},
	variant: `original`
},
	length: {
	name: `length`,
	author: `Jesse Traynham`,
	category: `Array/Text`,
	description: `Returns the length of a string or the number of elements in an array.`,
	kind: `single`,
	version: `1.0.0`,
	docs: {
	content: [{
	name: `content`,
	type: [`string`, `array`],
	required: true,
	description: `Content (string or array) whose length is to be determined.`
}],
	syntax: `[length: property.path]`
},
	processor(req) {
		if(!req.content){ return 0 }
		return req.content.length;
	},
	variant: `original`
},
	random: {
	name: `random`,
	author: `Your Name`,
	category: `Array/Text`,
	description: `Selects a random element from an array or a random character from a string.`,
	version: `1.0.0`,
	syntax: `[random: property.path]`,
	content: [{
	name: `content`,
	type: `any`,
	required: true,
	description: `The input value, which should be an array or a string.`
}],
	examples: [{
	payload: `{ fruits: ['Apple', 'Banana', 'Dragon'] }`,
	input: `[random: fruits]`,
	output: `Dragon`,
	note: `Output can be any of the array elements, as it is selected randomly.`
}, {
	input: `[random: 'What letter will it pick?']`,
	output: `t`,
	note: `Output can be any of the string characters, as it is selected randomly.`
}],
	processor(req) {
		
		let content = req.content
		
		if(!req.content){ return '' }
		
		const index = Math.floor(Math.random() * content.length)
		return content[index]
		
	},
	variant: `original`
},
	reverse: {
	name: `reverse`,
	author: `Jesse Traynham`,
	category: `Array/Text`,
	description: `Reverses a string or the order of elements in an array.`,
	kind: `single`,
	syntax: `[reverse: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `any`,
	required: true,
	description: `The input value, which should be a string or an array.`
}],
	examples: [{
	payload: `{ title: 'Hello World' }`,
	input: `[reverse: title]`,
	output: `dlroW olleH`,
	note: `The string is reversed.`
}, {
	payload: `{ numbers: [1, 2, 3, 4, 5] }`,
	input: `[reverse: numbers]`,
	output: `[5, 4, 3, 2, 1]`,
	note: `The order of elements in the array is reversed.`
}],
	processor(req) {
		let {content} = req
		if(!content){ return ''}
		return Array.isArray(content) ? content.reverse() : content.split('').reverse().join('')	
	},
	variant: `original`
},
	slice: {
	name: `slice`,
	author: `Jesse Traynham`,
	category: `Array/Text`,
	description: `Extracts a section of a string or array from the specified start and end indices.`,
	kind: `single`,
	syntax: `[slice(start, end): property.path]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `any`,
	required: true,
	description: `The input value, which should be a string or an array.`
}],
	params: [{
	name: `start`,
	type: `integer`,
	required: true,
	description: `Start index of the section to extract.`
}, {
	name: `end`,
	type: `integer`,
	required: true,
	description: `End index of the section to extract.`
}],
	examples: [{
	payload: `{ title: 'Hello World' }`,
	input: `[slice(0, 5): title]`,
	output: `Hello`,
	note: `The substring from index 0 to 5 (exclusive) is extracted.`
}, {
	payload: `{ numbers: [1, 2, 3, 4, 5] }`,
	input: `[slice(1, 4): numbers]`,
	output: `[2, 3, 4]`,
	note: `The subarray from index 1 to 4 (exclusive) is extracted.`
}],
	processor(req) {
		if(!req.content){ return '' }
		let [ start, end ] = req.params
		return req.content.slice(parseInt(start), parseInt(end))
	},
	variant: `original`
},
	choose: {
	name: `choose`,
	category: `Conditional`,
	description: `Selects one of three possible values based on a boolean condition. If the condition is true, the first value is selected. If false, the second value is selected. If the condition is neither true nor false (i.e., it is null or undefined), the third value is returned.`,
	kind: `single`,
	syntax: `[choose(condition) trueCase, falseCase, defaultCase]`,
	version: `1.0.0`,
	content: [{
	name: `trueCase`,
	type: `string`,
	description: `The content to output if the condition is true.`,
	required: true
}, {
	name: `falseCase`,
	type: `string`,
	description: `The content to output if the condition is false.`,
	required: false
}, {
	name: `defaultCase`,
	type: `string`,
	description: `The content to output if the condition is neither true nor false.`,
	required: false
}],
	params: [{
	name: `condition`,
	type: `boolean`,
	description: `The condition to evaluate.`,
	required: true
}],
	examples: [{
	payload: `{ isAdmin: true }`,
	code: `[choose(isAdmin) 'Hello, admin!', 'Hello, user!']`,
	result: `The result depends on the boolean value of isAdmin. If isAdmin is true, the result is "Hello, admin!". Otherwise, the result is "Hello, user!".`
}, {
	payload: `{ hasDiscount: false }`,
	code: `[choose(hasDiscount) 'You have a discount!', 'No discounts available.', 'Please login to check for discounts.']`,
	result: `The result depends on the boolean value of hasDiscount. If hasDiscount is true, the result is "You have a discount!". If false, the result is "No discounts available.". If hasDiscount is null or undefined, the result is "Please login to check for discounts.".`
}],
	processor(req) {
		
		let { contents, params } = req
		
		// IF TRUE
		if(params[0] == true){
			return contents[0]
		}
		
		// IF FALSE
		if(params[0] == false){
			return contents[1]
		}
		
		// OTHERWISE
		return contents[2]
		
	},
	variant: `original`
},
	if: {
	name: `if`,
	author: `Jesse Traynham`,
	category: `Conditional`,
	description: `Displays content conditionally based on provided parameters.`,
	kind: `container`,
	syntax: `[if: params] content... [/if]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `Content to be displayed based on the condition.`
}],
	params: [{
	name: `params`,
	type: `boolean`,
	required: true,
	description: `Boolean values for conditional check.`
}],
	examples: [{
	payload: `{ isAdmin: true }`,
	input: `[if: isAdmin] Welcome admin. [/if]`,
	output: `Welcome admin.`,
	note: `The content is shown as the condition evaluates to true.`
}, {
	payload: `{ isAdmin: false }`,
	input: `[if isAdmin] Welcome admin. [/if]`,
	output: ``,
	note: `No content is shown as the condition evaluates to false.`
}],
	processor(request) {
		
		let { cargo } = request
		
		let conditionIsTrue
		
		if(request.cargo.condition == null && cargo.values.length){
			conditionIsTrue = cargo.values.every( item => Boolean(item) )
		} 
		
		// USE PARAMS
		else if(request.cargo.condition == null && cargo.params.length){
			//conditionIsTrue = request.params.every( item => Boolean(item) )	
			conditionIsTrue = cargo.params.every( item => Boolean(item) )	
		} 
		
		// USE CARGO.CONDITION
		else {
			conditionIsTrue = request.cargo.condition
		}

		// Only run if conditionIsTrue and content is valid.
		if(conditionIsTrue && request.content){
			return request.engine.process(request.content, request.payload)
		}
		
		return ''
		
		// ELSE IS CURRENTLY NOT SUPPORTED.
		/*
		// Prepare elseTag for splitting and counting occurrences
		const elseTag = `${start}else${end}`
		
		// Count the occurrences of elseTag in the content
		const elseCount = (request.content.match(new RegExp(elseTag, 'g')) || []).length
		
		// Check if elseTag appears more than once
		if (elseCount > 1) {
			throw new Error("Invalid usage: ifelse can only have one else clause")
		}
		
		// Split the content into main content and else content
		let [mainContent, elseContent] = request.content.split(new RegExp(elseTag), 2)
		
		// Trim white spaces
		mainContent = mainContent.trim()
		elseContent = (elseContent || '').trim()
		
		// Return the appropriate content based on the condition
		return conditionIsTrue ? mainContent : elseContent
		*/
	},
	variant: `original`
},
	unless: {
	name: `unless`,
	author: `Jesse Traynham`,
	category: `Conditional`,
	description: `Renders the content only if the condition is falsy. Useful for displaying a specific message or content when a certain condition is not met.`,
	kind: `container`,
	syntax: `[unless(condition)] Your content here [/unless]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `Content to be displayed when the condition is not met.`
}],
	params: [{
	name: `condition`,
	type: `boolean`,
	required: true,
	description: `Boolean condition for content rendering.`
}],
	examples: [{
	payload: `{ isAdmin: false }`,
	input: `[unless(isAdmin)] You're not an admin. [/unless]`,
	output: `You're not an admin.`,
	note: `Content is shown as the condition evaluates to false (user is not an admin).`
}, {
	payload: `{ hasPremiumSubscription: false }`,
	input: `[unless(hasPremiumSubscription)] Upgrade to Premium for more features. [/unless]`,
	output: `Upgrade to Premium for more features.`,
	note: `Content is shown as the condition evaluates to false (user does not have a Premium subscription).`
}],
	processor(req) {

		// Check if all provided boolean values are true
		const allTrue = req.params.every((item) => Boolean(item))

		// Return content if all values are false, otherwise return an empty string
		return !allTrue ? req.content : ''

	},
	variant: `original`
},
	encode_delimiters: {
	name: `encode_delimiters`,
	author: `Jesse Traynham`,
	description: `Encodes TextSynth tag delimiters in the provided content.`,
	version: `1.0.0`,
	category: `Encoding`,
	kind: `single`,
	syntax: `[encode_delimiters: property.path]`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `Content within which the delimiters need to be encoded.`
}],
	examples: [{
	payload: `{ text: '[uppercase 'boom']' }`,
	input: `[encode_delimiters text]`,
	output: `&amp;lbrack;uppercase 'boom'&amp;rbrack;`,
	note: `The delimiters within the text have been replaced by their escape sequences.`
}],
	processor(req) {
		
		if(!req.content) { return req.content }
		if(typeof req.content !== 'string') { return req.content }
		
		let { raw, enc } = req.engine.options.delimiters
		return req.content?.split(raw.start).join(enc.start).split(raw.end).join(enc.end)
		
	},
	variant: `original`
},
	escape_delimiters: {
	name: `escape_delimiters`,
	author: `Jesse Traynham`,
	description: `Escapes TextSynth tag delimiters in the provided content.`,
	version: `1.0.0`,
	category: `Encoding`,
	kind: `single`,
	syntax: `[escape_delimiters: property.path]`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `Content within which the delimiters need to be escaped.`
}],
	examples: [{
	payload: `{ text: '[uppercase 'boom']' }`,
	input: `[escape_delimiters text]`,
	output: `&amp;lbrack;uppercase 'boom'&amp;rbrack;`,
	note: `The delimiters within the text have been replaced by their escape sequences.`
}],
	processor(req) {
		
		if(!req.content) { return req.content }
		if(typeof req.content !== 'string') { return req.content }
		
		let { raw, esc } = req.engine.options.delimiters
		
		return req.content?.split(raw.start).join(esc.start).split(raw.end).join(esc.end)
		
	},
	variant: `original`
},
	escape_html: {
	name: `escape_html`,
	author: `Jesse Traynham`,
	category: `Encoding`,
	description: `Escapes HTML entities in a string to prevent code injection.`,
	kind: `single`,
	syntax: `[escapeHtml: property.path]`,
	version: `1.0.0`,
	params: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path to the property to escape HTML characters.`
}],
	examples: [{
	payload: `{ text: '<div>Hello</div>' }`,
	input: `[escapeHtml: text]`,
	output: `&lt;div&gt;Hello&lt;/div&gt;`,
	note: `HTML tags are escaped to prevent code injection.`
}],
	processor(req) {

		let escapeCodes = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&apos;',
			'[': '&lbrack;',
			']': '&rbrack;'
		}

		return req.content?.replace(/[&<>"'[\]]/g, tag => escapeCodes[tag])

	},
	variant: `original`
},
	stringify: {
	name: `stringify`,
	author: `Jesse Traynham`,
	version: `1.0.0`,
	description: `Converts a JavaScript value (such as an object, array, number, or string) to a JSON string.`,
	examples: [{
	payload: `{ stringy: { key: 'value', key2: 'value2' } }`,
	input: `[stringify stringy]`,
	output: `{"key":"value","key2":"value2"}`,
	note: `Converts an object to a JSON string.`
}, {
	payload: `{ fruit: ['apple', 'orange', 'banana'] }`,
	input: `[stringify fruit]`,
	output: `["apple","orange","banana"]`,
	note: `Converts an array to a JSON string.`
}, {
	input: `[stringify 'Hello, World!']`,
	output: `"Hello, World!"`,
	note: `Converts a string to a JSON string.`
}],
	syntax: `[stringify value]`,
	content: [{
	name: `content`,
	type: `any`,
	required: true,
	description: `The JavaScript value to be converted to a JSON string.`
}],
	category: `Encoding`,
	kind: `single`,
	processor(req) {
		
		if(req.cargo.flags.includes('pretty')){
			return JSON.stringify(req.content, null, 2)
		}
		
		return JSON.stringify(req.content)
		
	},
	variant: `original`
},
	unencode_delimiters: {
	name: `unencode_delimiters`,
	author: `Jesse Traynham`,
	category: `Encoding`,
	description: `Unescapes TextSynth tag delimiters.`,
	kind: `single`,
	syntax: `[unescape_delimiters: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The path or content to unescape delimiters.`
}],
	examples: [{
	payload: `{ text: '& lbrack;uppercase "boom"& rbrack;' }`,
	input: `[unescape_delimiters: text]`,
	output: `&lbrack;uppercase "boom"&rbrack;`,
	note: `Escaped delimiters are converted back to their original form.`
}],
	processor(req) {
		
		if(!req.content) { return req.content }
		
		let { raw, enc } = req.engine.options.delimiters
		
		return req.content
			.split(enc.start).join(raw.start)
			.split(enc.end).join(raw.end)
			
	},
	variant: `original`
},
	unescape_delimiters: {
	name: `unescape_delimiters`,
	author: `Jesse Traynham`,
	category: `Encoding`,
	description: `Unescapes TextSynth tag delimiters.`,
	kind: `single`,
	syntax: `[unescape_delimiters: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The path or content to unescape delimiters.`
}],
	examples: [{
	payload: `{ text: '& lbrack;uppercase "boom"& rbrack;' }`,
	input: `[unescape_delimiters: text]`,
	output: `&lbrack;uppercase "boom"&rbrack;`,
	note: `Escaped delimiters are converted back to their original form.`
}],
	processor(req) {
		
		if(!req.content) { return req.content }
		
		let { raw, esc } = req.engine.options.delimiters
		
		return req.content
			.split(esc.start).join(raw.start)
			.split(esc.end).join(raw.end)
			
	},
	variant: `original`
},
	unescape_html: {
	name: `unescape_html`,
	author: `Jesse Traynham`,
	category: `Encoding`,
	description: `Unescapes HTML entities in a string, converting them back to their original characters.`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The string with escaped HTML entities.`
}],
	examples: [{
	payload: `{ text: "The &quot;quick&quot; brown fox jumps over the &lt;lazy&gt; dog."}`,
	input: `[unescape_html: text]`,
	output: `The "quick" brown fox jumps over the <lazy> dog.`,
	note: `Converts escaped HTML entities back to their original characters.`
}],
	processor(req) {
		
		if(!req.content) { return req.content }
		
		let escapeCodes = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&apos;',
			'[': '&lbrack;',
			']': '&rbrack;'
		}
		
		let escapeCodes_flipped = Object.entries(escapeCodes).reduce((acc, [key, value]) => {
			acc[value] = key
			return acc
		}, {})
		
		const pattern = Object.values(escapeCodes).join('|')
		const regex = new RegExp(pattern, 'g')
		
		return req.content.replace(regex, tag => escapeCodes_flipped[tag])
		
	},
	variant: `original`
},
	ignore: {
	name: `ignore`,
	author: `Jesse Traynham`,
	category: `Formatting`,
	description: `Ignores the content and returns it as a raw string, escaping any special characters.`,
	kind: `container`,
	syntax: `[ignore] Your raw contenthere [/ignore]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `Content to be returned as a raw string.`
}],
	examples: [{
	payload: `{ }`,
	input: `[ignore]# Header 
 **Bold Text** [/ignore]`,
	output: `# Header 
 **Bold Text**`,
	note: `Content is returned as raw text.`
}],
	variant: `original`
},
	markdown: {
	name: `markdown`,
	aliases: [`md`],
	author: `Jesse Traynham`,
	browserStyles: [`https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css`],
	browserScripts: [`https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js`, `https://cdn.jsdelivr.net/npm/markdown-it-attrs@4.3.1/markdown-it-attrs.browser.min.js`, `https://cdn.jsdelivr.net/npm/prismjs@latest/prism.min.js`],
	category: `Formatting`,
	description: `Renders markdown content into HTML with additional support for attributes and Prism syntax highlighting.`,
	kind: `container`,
	version: `1.0.0`,
	docs: {
	flags: {
	keepTabs: `By default, tabs will be removed. Use this flag to leave tabs in.`
},
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `Markdown content to be rendered into HTML.`
}],
	examples: [{
	payload: `{ }`,
	template: `[markdown]# Header <br> **Bold Text** [/markdown]`,
	output: `<h1>Header</h1> <p><strong>Bold Text</strong></p>`,
	note: `Markdown content is converted to HTML.`
}],
	syntax: `[markdown] Your **markdown** text here [/markdown]`
},
	_md: null,
	async onStartup() {
		
		const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
			
		if (isNode) {
			
			const { default: MarkdownIt } = await import('markdown-it');
			const { default: markdownItAttrs } = await import('markdown-it-attrs');
			const { default: prism } = await import('markdown-it-prism');
			
			this._md = await MarkdownIt({ html: true })
				.use(markdownItAttrs)
				.use(prism);
			
		} else {
			
			// Will be called after all scripts are loaded!
			this._md = window.markdownit()
				.use(window.markdownItAttrs)
			
		}

	},
	onRender() {
	
		if (window.Prism && typeof window.Prism.highlightAll === 'function') {
			window.Prism.highlightAll();
		}
		
	},
	processor(req) {
		
		if(!req.cargo?.flags?.includes('keepTabs')){
			req.content = req.content.replace(/\t/g, '')
		}
		
		let output = req.engine.process(req.content, req.payload)
		
		output = this._md.render(output)
		
		return output;
		
	},
	variant: `original`
},
	md: {
	name: `md`,
	aliases: [`md`],
	author: `Jesse Traynham`,
	browserStyles: [`https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css`],
	browserScripts: [`https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js`, `https://cdn.jsdelivr.net/npm/markdown-it-attrs@4.3.1/markdown-it-attrs.browser.min.js`, `https://cdn.jsdelivr.net/npm/prismjs@latest/prism.min.js`],
	category: `Formatting`,
	description: `Renders markdown content into HTML with additional support for attributes and Prism syntax highlighting.`,
	kind: `container`,
	version: `1.0.0`,
	docs: {
	flags: {
	keepTabs: `By default, tabs will be removed. Use this flag to leave tabs in.`
},
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `Markdown content to be rendered into HTML.`
}],
	examples: [{
	payload: `{ }`,
	template: `[markdown]# Header <br> **Bold Text** [/markdown]`,
	output: `<h1>Header</h1> <p><strong>Bold Text</strong></p>`,
	note: `Markdown content is converted to HTML.`
}],
	syntax: `[markdown] Your **markdown** text here [/markdown]`
},
	_md: null,
	async onStartup() {
		
		const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
			
		if (isNode) {
			
			const { default: MarkdownIt } = await import('markdown-it');
			const { default: markdownItAttrs } = await import('markdown-it-attrs');
			const { default: prism } = await import('markdown-it-prism');
			
			this._md = await MarkdownIt({ html: true })
				.use(markdownItAttrs)
				.use(prism);
			
		} else {
			
			// Will be called after all scripts are loaded!
			this._md = window.markdownit()
				.use(window.markdownItAttrs)
			
		}

	},
	onRender() {
	
		if (window.Prism && typeof window.Prism.highlightAll === 'function') {
			window.Prism.highlightAll();
		}
		
	},
	processor(req) {
		
		if(!req.cargo?.flags?.includes('keepTabs')){
			req.content = req.content.replace(/\t/g, '')
		}
		
		let output = req.engine.process(req.content, req.payload)
		
		output = this._md.render(output)
		
		return output;
		
	},
	variant: `alias`,
	alias: `md`
},
	html_tag: {
	name: `html_tag`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `original`
},
	html: {
	name: `html`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `html`
},
	head: {
	name: `head`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `head`
},
	title: {
	name: `title`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `title`
},
	body: {
	name: `body`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `body`
},
	h1: {
	name: `h1`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `h1`
},
	h2: {
	name: `h2`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `h2`
},
	h3: {
	name: `h3`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `h3`
},
	h4: {
	name: `h4`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `h4`
},
	h5: {
	name: `h5`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `h5`
},
	h6: {
	name: `h6`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `h6`
},
	a: {
	name: `a`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `a`
},
	figure: {
	name: `figure`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `figure`
},
	figcaption: {
	name: `figcaption`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `figcaption`
},
	form: {
	name: `form`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `form`
},
	button: {
	name: `button`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `button`
},
	fieldset: {
	name: `fieldset`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `fieldset`
},
	legend: {
	name: `legend`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `legend`
},
	label: {
	name: `label`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `label`
},
	textarea: {
	name: `textarea`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `textarea`
},
	optgroup: {
	name: `optgroup`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `optgroup`
},
	option: {
	name: `option`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `option`
},
	select: {
	name: `select`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `select`
},
	code: {
	name: `code`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `code`
},
	div: {
	name: `div`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `div`
},
	p: {
	name: `p`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `p`
},
	span: {
	name: `span`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `span`
},
	pre: {
	name: `pre`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `pre`
},
	blockquote: {
	name: `blockquote`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `blockquote`
},
	small: {
	name: `small`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `small`
},
	strong: {
	name: `strong`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `strong`
},
	frameset: {
	name: `frameset`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `frameset`
},
	noframes: {
	name: `noframes`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `noframes`
},
	ul: {
	name: `ul`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `ul`
},
	li: {
	name: `li`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `li`
},
	ol: {
	name: `ol`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `ol`
},
	dl: {
	name: `dl`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `dl`
},
	dt: {
	name: `dt`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `dt`
},
	dd: {
	name: `dd`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `dd`
},
	table: {
	name: `table`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `table`
},
	thead: {
	name: `thead`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `thead`
},
	tbody: {
	name: `tbody`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `tbody`
},
	tfoot: {
	name: `tfoot`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `tfoot`
},
	tr: {
	name: `tr`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `tr`
},
	th: {
	name: `th`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `th`
},
	td: {
	name: `td`,
	author: `Jesse Traynham`,
	category: `HTML`,
	aliases: [`html`, `head`, `title`, `body`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `figure`, `figcaption`, `form`, `button`, `fieldset`, `legend`, `label`, `textarea`, `optgroup`, `option`, `optgroup`, `select`, `code`, `div`, `p`, `span`, `code`, `pre`, `blockquote`, `small`, `strong`, `frameset`, `noframes`, `ul`, `li`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`],
	description: `Generates a div tag with optional attributes, classes and id. All the additional arguments will be treated as HTML attributes and added to the div tag.`,
	kind: `container`,
	syntax: `[div: attribute="value" .class #id]content[/div]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The inner HTML content for the div element.`
}],
	params: [{
	name: `params`,
	type: `string`,
	required: false,
	description: `Optional HTML attributes for the div element.`
}],
	examples: [{
	payload: `{ }`,
	input: `[div: width="500" #myId data-custom="customValue"]This is the div content[/div]`,
	output: `<div width="500" id="myId" data-custom="customValue">This is the div content</div>`,
	note: `Generates a div tag with the provided attributes and content.`
}, {
	payload: `{ }`,
	input: `[div: .myClass #myId]This is the div content[/div]`,
	output: `<div class="myClass" id="myId">This is the div content</div>`,
	note: `Generates a div tag with the provided classes, id, and content.`
}],
	processor(req) {
		
		let { cargo } = req
		let tag = this.alias || 'div'
		let attr = {...req.cargo?.attributes}
		
		if(attr.class){
			attr.class.split(' ').forEach( at => {
				if(!req.cargo.classes.includes(at)){ req.cargo.classes.push(at) }
			})
		}
		
		// CLASSES
		if(cargo.classes?.length){ 
			attr.class = cargo.classes.sort().join(' ')
		}
		
		// ID
		if(cargo.id){ attr.id = cargo?.id }
		
		// INSERT FLAGS INTO VALUES	
		cargo.flags.forEach(flag => { cargo.values.push(flag) })
		
		// VALUES - DEAL WITH QUOTES AND SPACES.
		if(cargo.values){
			cargo.values = cargo.values.map(value => {
				if(value.includes(' ')){ return `"${value}"` }
				return value
			})
		}
		
		const attributeString = [
			'',
			...Object.entries(attr).map(([key, value]) => `${key}="${value}"`),
			...cargo.values //|| []
		].join(' ')
		
		return `<${tag}${attributeString}>${req.content}</${tag}>`
		
	},
	variant: `alias`,
	alias: `td`
},
	linkList: {
	name: `linkList`,
	author: `Jesse Traynham`,
	category: `HTML`,
	description: `Generates an HTML list of links from an object with name-url pairs.`,
	type: [`object`],
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `object`,
	required: true,
	description: `An object containing key-value pairs of names and URLs.`
}],
	params: [],
	examples: [{
	payload: {
	sidebar: {
	Home: `/`,
	About: `/about`,
	Contact: `/contact`
}
},
	input: `[linkList: sidebar]`,
	output: `<ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/contact">Contact</a></li></ul>`,
	note: `Generates an unordered list of links using the names and URLs from the "sidebar" object.`
}],
	processor(req) {
		
		if(!req.content) { return req.content }
		
		const listItems = Object.entries(req.content)
			.map(([name, url]) => `<li><a href="${url}">${name}</a></li>`)
			.join('');
			
		return `<ul>${listItems}</ul>`;
		
	},
	variant: `original`
},
	each: {
	name: `each`,
	author: `Jesse Traynham`,
	category: `Iteration`,
	description: `Iterate over an array or an object.`,
	kind: `container`,
	syntax: `[each: items]
	Your content here
[/each]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The template to process for each iteration.`
}],
	params: [{
	name: `items`,
	type: [`array`, `object`],
	required: true,
	description: `The array or object to iterate over.`
}],
	examples: [{
	payload: {
	user: {
	hobbies: [`Reading`, `Coding`, `Music`]
}
},
	input: `[each: user.hobbies]
	- [value]
[/each]`,
	output: `\t- Reading\n\t- Coding\n\t- Music`,
	note: `Iterates over the array "user.hobbies" and prints each value.`
}, {
	payload: {
	items: {
	name: `John Doe`,
	age: 30
}
},
	input: `[each: items]
	[key]: [value]
[/each]`,
	output: `\tname: John Doe\n\tage: 30`,
	note: `Iterates over the object "items" and prints each key-value pair.`
}],
	processor(req) {
		
		let payload = {...req.payload}
		
		let iterable = req.params[0]
		let name = ''
		
		if(req.cargo.using){
			name = req.cargo.using.name
			iterable = req.cargo.using.value
		}
		
		if(!iterable){ return '' }
		
		let output = ''
		
		if (Array.isArray(iterable)) {
			
			iterable.forEach((item, index) => {
				payload.value = item
				payload.index = index
				payload[name] = item
				//output += req.engine.process(req.content, payload)
				output += req.engine.process(req.contentRaw, payload)
			})
			
		} else if (typeof iterable === 'object') {
			
			Object.entries(iterable).forEach(([key, value], index) => {
				
				payload.name = key
				payload.key = key
				payload.value = value
				payload.index = index
				payload[name] = {key, value}
				
				//output += req.engine.process(req.content, payload)
				output += req.engine.process(req.contentRaw, payload)
				
			})
			
		}
		
	return output
		
	},
	variant: `original`
},
	groupBy: {
	name: `groupBy`,
	kind: `container`,
	category: `Iteration`,
	processor(req) {
		
//		console.log('GROUP REQ::', req)
//		console.log('GROUP CARGO::', req.cargo)
		
		
//		console.log('USING HERE::', req.cargo.using)
		
		
//		const list = req.params?.[0];
//		const prop = req.cargo.using?.value;

		const list = req.cargo.using?.value
		const prop = req.cargo.using?.name
		let payload = {...req.payload}

		// console.log(
		// 	{
		// 		list, prop
		// 	}
		// )


		if (!Array.isArray(list)) {
			return `<pre>groupBy error: expected array, got ${typeof list}</pre>`;
		}
		if (!prop) {
			return `<pre>groupBy error: missing "using" key</pre>`;
		}
		

		const grouped = list.reduce((acc, item) => {
			const key = item?.[prop] || 'Uncategorized';
			if (!acc[key]) acc[key] = [];
			acc[key].push(item);
			return acc;
		}, {});

//		console.log('GROUPD::', grouped)
		
		
		// Transform into an array of { key, value } objects for easy [each]
		const output = Object.entries(grouped).map(([key, value]) => ({ key, value }));

//		console.log('OUTPUT::', output)

//		console.log('RAW::', req.content)
		
		payload.items = output

		//return req.engine.parse(req.content, { items: output, ...req.payload });
		
		return req.engine.process(req.contentRaw, payload )
		
		/*
		// Inject grouped array as `.` and render content
		return req.engine.render(req.contentRaw, { '.': output, ...req.payload });
		*/
	},
	variant: `original`
},
	block: {
	name: `block`,
	author: `Jesse Traynham`,
	category: `Layout`,
	description: `Defines a block that can be filled later.`,
	kind: `container`,
	syntax: `[block 'blockName']...content...[/block]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: false,
	description: `The default content for the block.`
}],
	params: [{
	name: `blockName`,
	type: `string`,
	required: true,
	description: `The name of the block.`
}],
	examples: [{
	input: `[block 'header']Default Header Content[/block]`,
	output: `The output depends on how the block is later used in the layout.`,
	note: `This block named "header" can be filled later in a layout.`
}],
	processor(req) {
		
		let { payload } = req
		let name = req.params[0].value
		
		if(!payload._layoutStack){
			payload._layoutStack = [{}]
		}
		
		let stack = payload._layoutStack[0]
		
		if(!stack[name]){
			stack[name] = req.content
		}
		
		let content = stack[req.params[0].value]
		
		if(!content){ return content }
		
		if(req.cargo.flags.includes('markdown')){
			return req.engine.runPlugin('markdown', {content: content})	
		}
		
		return content
		
	},
	variant: `original`
},
	block_append: {
	name: `block_append`,
	author: `Jesse Traynham`,
	category: `Layout`,
	description: `Appends to the content of a block.`,
	kind: `container`,
	syntax: `[block_append 'blockName']...content...[/block_append]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The content to append to the block.`
}],
	params: [{
	name: `blockName`,
	type: `string`,
	required: true,
	description: `The name of the block.`
}],
	examples: [{
	input: `[block_append 'header']Additional Header Content[/block_append]`,
	output: `The output depends on the initial content of the block in the layout.`,
	note: `This example appends additional content to a block named "header".`
}],
	processor({ content, params, payload, engine}) {
		
		if(!payload._layoutStack){
			return ''
		}
		
		// GET THE BLOCK NAME FROM THE PARAMS
		const blockName = params[0].value
		
		// ACCESS THE CURRENT LAYOUT BY GETTING THE TOP ITEM FROM THE LAYOUT STACK
		let currentLayout = payload._layoutStack[payload._layoutStack.length - 1]

		// APPEND PROCESSED CONTENT TO THE CURRENT BLOCK. IF THE BLOCK DOES NOT EXIST,
		// IT CREATES A NEW BLOCK WITH THE PROCESSED CONTENT.
		currentLayout[blockName] = currentLayout[blockName] + engine.process(content, payload)
		
		// SINCE THIS IS A BLOCK_APPEND PROCESSOR, IT DOESN'T NEED TO RETURN ANY CONTENT 
		// FOR THE CURRENT PROCESSING STAGE, HENCE IT RETURNS AN EMPTY STRING.
		return ''
	},
	variant: `original`
},
	block_prepend: {
	name: `block_prepend`,
	author: `Jesse Traynham`,
	category: `Layout`,
	description: `Prepends to the content of a block.`,
	kind: `container`,
	syntax: `[block_prepend 'blockName']...content...[/block_prepend]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The content to prepend to the block.`
}],
	params: [{
	name: `blockName`,
	type: `string`,
	required: true,
	description: `The name of the block.`
}],
	examples: [{
	input: `[block_prepend 'header']Prepend Header Content[/block_prepend]`,
	output: `The output depends on the initial content of the block in the layout.`,
	note: `This example prepends additional content to a block named "header".`
}],
	processor({ content, params, payload, engine}) {
		
		if(!payload._layoutStack){
			return ''
		}
		
		// EXTRACT THE BLOCK NAME FROM THE PARAMETERS PASSED IN
		const blockName = params[0].value
		
		// ACCESS THE MOST RECENT LAYOUT FROM THE STACK
		let currentLayout = payload._layoutStack[payload._layoutStack.length - 1]
		
		// PREPEND PROCESSED CONTENT TO THE CURRENT BLOCK. IF THE BLOCK DOES NOT EXIST, 
		// IT CREATES A NEW BLOCK WITH THE PROCESSED CONTENT.
		currentLayout[blockName] = engine.process(content, payload) + currentLayout[blockName]
		
		// AS THIS IS A BLOCK_PREPEND PROCESSOR, IT DOESN'T NEED TO RETURN ANY CONTENT 
		// FOR THE CURRENT PROCESSING STAGE, SO IT RETURNS AN EMPTY STRING.
		return ''
	},
	variant: `original`
},
	block_set: {
	name: `block_set`,
	author: `Jesse Traynham`,
	category: `Layout`,
	description: `Sets (replaces) the content of a block.`,
	kind: `container`,
	syntax: `[block_set 'blockName']...content...[/block_set]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The content to set for the block.`
}],
	params: [{
	name: `blockName`,
	type: `string`,
	required: true,
	description: `The name of the block.`
}],
	examples: [{
	input: `[block_set 'header']Welcome to our site![/block_set]`,
	output: `The output depends on the initial content of the block in the layout.`,
	note: `This example sets the content of a block named "header".`
}],
	processor({ content, params, payload, engine}) {
		
		if(!payload._layoutStack){
			return ''
		}
		
		// EXTRACT THE BLOCK NAME FROM THE PARAMETERS PASSED IN
		const blockName = params[0].value
		
		// ACCESS THE MOST RECENT LAYOUT FROM THE STACK
		let currentLayout = payload._layoutStack[payload._layoutStack.length - 1]
		
		// ASSIGN THE PROCESSED CONTENT TO THE BLOCK WITH THE SPECIFIED NAME IN THE CURRENT LAYOUT.
		// IF THE BLOCK DOES NOT EXIST, IT WILL CREATE A NEW ONE WITH THE PROCESSED CONTENT.
		currentLayout[blockName] = engine.process(content, payload)
		
		// AS THIS IS A BLOCK_SET PROCESSOR, IT DOESN'T NEED TO RETURN ANY CONTENT 
		// FOR THE CURRENT PROCESSING STAGE, SO IT RETURNS AN EMPTY STRING.
		return ''
	},
	variant: `original`
},
	layout: {
	name: `layout`,
	author: `Jesse Traynham`,
	category: `Layout`,
	description: `Loads a base template and inserts child template content into blocks.`,
	kind: `container`,
	syntax: `[layout "templatePath"]
	[block_set "blockName"]Block content[/block_set]
[/layout]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The template to inject into the layout.`
}],
	params: [{
	name: `layout`,
	type: `string`,
	required: true,
	description: `Path to the base layout.`
}],
	examples: [{
	input: `[layout "main.synth"]
	[block_set "title"]My Site[/block_set]
	[block_append "title"] › Home[/block_append]
	[block_prepend "title"]Welcome to [/block_prepend]
	[block_set "body"]Page content[/block_set]
[/layout]
`,
	output: `Depends on the content of the "main.synth" template.`,
	note: `Loads the "main.synth" layout and sets the "title" and "body" blocks.`
}],
	processor(req) {
		
		// DESTRUCTURE THE REQUEST OBJECT
		//let { content, params, payload, engine } = req
		let { contentRaw, params, payload, engine } = req
		
		// LOAD THE LAYOUT CONTENT
//		let layoutContent = this.loadLayout(payload, params)
		let layoutContent = this.loadLayout(payload, params, req)
		
		// CREATE A STACK TO HANDLE NESTED LAYOUT RENDERING
		// INITIALIZE IT IF IT DOESN'T EXIST YET
		payload._layoutStack = payload._layoutStack || []
		
		// PUSH AN EMPTY OBJECT INTO THE STACK TO HANDLE THE CURRENT LAYOUT
		payload._layoutStack.push({})
		
		// REMOVE COMMENTS FROM THE LAYOUT CONTENT
		layoutContent = engine.removeComments(layoutContent)
		
		// REMOVE LEADING TABS FROM THE LAYOUT CONTENT
		layoutContent = engine.removeLeadingTabs(layoutContent)
		
		// POPULATE THE BLOCKS OBJECT WITH THE INITIAL BLOCK CONTENT FROM THE LAYOUT
		this.populateLayoutBlocksObj(engine, payload, params, layoutContent) 
		
		// RENDER THE LAYOUT WITH THE BLOCK CONTENT AND RETURN THE RESULT
		//let renderedLayout = this.renderLayout(engine, content, layoutContent, params, payload)
		let renderedLayout = this.renderLayout(engine, contentRaw, layoutContent, params, payload)
		
		// ONCE THE LAYOUT IS RENDERED, POP THE STACK TO CLEAN UP
		payload._layoutStack.pop()
		
		// RETURN THE RENDERED LAYOUT
		return renderedLayout
		
	},
	loadLayout(payload, params, req) {
	//loadLayout(payload, params) {
		
		
		// IF THE PAYLOAD CONTAINS THE LAYOUT, JUST RETURN IT
		if(payload.layout){ return payload.layout }
		
		if (req.engine.env.platform === 'browser') {
			return req.engine.fetchSync(params[0].value)
		}
		
		// CONSTRUCT THE FULL PATH TO THE LAYOUT FILE
		const layoutPath = path.join(payload._synth.views, params[0].value)
		
		// CHECK IF THE LAYOUT FILE EXISTS BEFORE READING IT
		if (!fs.existsSync(layoutPath)) {
			return `ERROR: Layout file does not exist: ${layoutPath}`
		}
		
		// READ AND RETURN THE CONTENT OF THE LAYOUT FILE
		return fs.readFileSync(layoutPath, 'utf-8')
		
	},
	populateLayoutBlocksObj(engine, payload, params, layoutContent) {
		
		// USE THE TOP OBJECT IN THE LAYOUT STACK
		let blocks = payload._layoutStack[payload._layoutStack.length - 1]
		
		engine.process(layoutContent, { ...payload, blocks })
		
	},
	renderLayout(engine, content, layoutContent, params, payload) {
		
		let rendered = ''
		
		// PROCESS THE CONTENT OF THE LAYOUT
		if(content){
			rendered = engine.process(content, payload)
		}
		
		// USE THE TOP OBJECT IN THE LAYOUT STACK
		let blocks = payload._layoutStack[payload._layoutStack.length - 1]
		
		engine.process(layoutContent, { ...payload, blocks})
		
		// IF THE PAYLOAD HAS A 'PAGE.BLOCK' PROPERTY, USE THE BLOCK FOR THE RENDERED CONTENT
		if(payload.page?.block){
			blocks[payload.page.block] = rendered
		}
		
		layoutContent = engine.process(layoutContent, payload)
		
		// RETURN THE FINAL LAYOUT CONTENT WITH ALL BLOCK PLACEHOLDERS REPLACED
		return layoutContent
		
	},
	variant: `original`
},
	camelcase: {
	name: `camelcase`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Converts a string to camelCase.`,
	kind: `single`,
	syntax: `[camelcase: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The string to be converted to camelCase.`
}],
	examples: [{
	input: `[camelcase: 'hello world']`,
	output: `helloWorld`,
	note: `This example converts the string "hello world" to "helloWorld".`
}],
	processor({content}) {
		if(typeof content !== 'string') return content
		return content.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, '');
	},
	variant: `original`
},
	capitalize: {
	name: `capitalize`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Capitalizes the first letter of a string.`,
	kind: `single`,
	syntax: `[capitalize: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `string`,
	required: true,
	description: `The string to be capitalized.`
}],
	examples: [{
	input: `[capitalize: 'hello world']`,
	output: `Hello world`,
	note: `This example capitalizes the first letter of the string "hello world".`
}],
	processor({content}) {
		if(typeof content !== 'string') { return content }
		return content.charAt(0).toUpperCase() + content.slice(1);
	},
	variant: `original`
},
	lowercase: {
	name: `lowercase`,
	aliases: `lower`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Converts a string to lowercase.`,
	kind: `single`,
	syntax: `[lowercase: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to be converted to lowercase.`
}],
	examples: [{
	input: `[lowercase: 'Hello World']`,
	output: `hello world`,
	note: `This example converts the string "Hello World" to lowercase.`
}, {
	payload: {
	site: {
	title: `My Cool Site`
}
},
	input: `[lowercase: site.title]`,
	output: `my cool site`,
	note: `This example converts the site title to lowercase.`
}],
	processor({content}) {
		if(typeof content !== 'string') return content
		return content.toLowerCase()
	},
	variant: `original`
},
	repeat: {
	name: `repeat`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Repeats a string a specified number of times.`,
	kind: `single`,
	syntax: `[repeat(times): property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to be repeated.`
}],
	params: [{
	name: `times`,
	type: `number`,
	required: true,
	description: `The number of times to repeat the string.`
}],
	examples: [{
	input: `[repeat(3): 'Hello']`,
	output: `HelloHelloHello`,
	note: `This example repeats the string "Hello" 3 times.`
}, {
	payload: {
	site: {
	title: `My Cool Site`
}
},
	input: `[repeat(2): site.title]`,
	output: `My Cool SiteMy Cool Site`,
	note: `This example repeats the site title 2 times.`
}],
	processor(req) {
		if(typeof req.content !== 'string') return req.content
		return req.content.repeat(parseInt(req.params[0]))
	},
	variant: `original`
},
	replace: {
	name: `replace`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Replaces all occurrences of a search string with a replacement string.`,
	kind: `single`,
	syntax: `[replace(search, replacement): property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property where replacements will be made.`
}],
	params: [{
	name: `search`,
	type: `string`,
	required: true,
	description: `The string to be replaced.`
}, {
	name: `replacement`,
	type: `string`,
	required: true,
	description: `The string to replace with.`
}],
	examples: [{
	input: `[replace('Hello', 'Hi'): 'Hello World']`,
	output: `Hi World`,
	note: `This example replaces "Hello" with "Hi" in the string "Hello World".`
}, {
	payload: {
	site: {
	title: `My Cool Site`
}
},
	input: `[replace(' ', '-'): site.title]`,
	output: `My-Cool-Site`,
	note: `This example replaces spaces with hyphens in the site title.`
}],
	processor(req) {
		
		if(typeof req.content !== 'string') return req.content
		
		const [ search, replacement ] = req.params
		const replacer = new RegExp(search, 'g')
		return req.content.replace(replacer, replacement)
		
	},
	variant: `original`
},
	slugify: {
	name: `slugify`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Converts a string into a URL-friendly slug.`,
	kind: `single`,
	syntax: `[slugify: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to be slugified.`
}],
	examples: [{
	input: `[slugify: 'Hello World!']`,
	output: `hello-world`,
	note: `This example slugifies the string "Hello World!".`
}, {
	payload: {
	site: {
	title: `My Cool Site`
}
},
	input: `[slugify: site.title]`,
	output: `my-cool-site`,
	note: `This example slugifies the site title.`
}],
	processor({content}) {
		if(typeof content !== 'string') return content
		return content
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	},
	variant: `original`
},
	snakecase: {
	name: `snakecase`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Converts a string to snake_case.`,
	kind: `single`,
	syntax: `[snakecase: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to convert to snake_case.`
}],
	examples: [{
	payload: {
	example: `exampleTextForSnakeCase`
},
	input: `[snakecase: example]`,
	output: `example_text_for_snake_case`,
	note: `This example converts "exampleTextForSnakeCase" to snake_case.`
}],
	processor({content}) {
		if(typeof content !== 'string') return content
		return content.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '_').toLowerCase();
	},
	variant: `original`
},
	substring: {
	name: `substring`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Returns a substring from the specified start and end indices.`,
	kind: `single`,
	syntax: `[substring(start, end): property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to get a substring from.`
}],
	params: [{
	name: `start`,
	type: `number`,
	required: true,
	description: `The starting index of the substring.`
}, {
	name: `end`,
	type: `number`,
	required: true,
	description: `The ending index of the substring.`
}],
	examples: [{
	payload: {
	example: `exampleSubstring`
},
	input: `[substring(0, 5): example]`,
	output: `examp`,
	note: `This example retrieves the substring of "exampleSubstring" from index 0 to 5.`
}],
	processor({content, params}) {
		
		let [start = 0, end = 0] = params
		
		if(params.length !== 2) return content
		if(typeof content !== 'string') return content
		if(start + end === 0) return content
		
		return content.substring(parseInt(start), parseInt(end))
		
	},
	variant: `original`
},
	titlecase: {
	name: `titlecase`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Converts a string to title case, capitalizing the first letter of each word.`,
	kind: `single`,
	syntax: `[titlecase: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to convert to title case.`
}],
	examples: [{
	payload: {
	example: `example title case`
},
	input: `[titlecase: example]`,
	output: `Example Title Case`,
	note: `This example converts "example title case" to "Example Title Case".`
}],
	processor({content}) {
		if(typeof content !== 'string') return content
		return content.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
	},
	variant: `original`
},
	trim: {
	name: `trim`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Trims whitespace from the beginning and end of a string.`,
	kind: `single`,
	syntax: `[trim: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to trim.`
}],
	examples: [{
	payload: {
	example: ` example trim `
},
	input: `[trim: example]`,
	output: `example trim`,
	note: `This example trims the whitespace from the string " example trim ".`
}],
	processor({content}) {
		if(typeof content !== 'string') return content
		return content.trim()
	},
	variant: `original`
},
	truncate: {
	name: `truncate`,
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Truncates a string to a specified length, optionally appending a custom suffix.`,
	kind: `single`,
	syntax: `[truncate(maxLength, suffix): property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to truncate.`
}],
	params: [{
	name: `maxLength`,
	type: `number`,
	required: true,
	description: `The maximum length of the output string.`
}, {
	name: `suffix`,
	type: `string`,
	required: false,
	description: `The suffix to append if the string is truncated.`,
	default: `...`
}],
	examples: [{
	payload: {
	example: `This is a long sentence that will be truncated.`
},
	input: `[truncate(20): example]`,
	output: `This is a long sent...`,
	note: `This example truncates the string "This is a long sentence that will be truncated." to a maximum length of 20 characters.`
}, {
	payload: {
	example: `This is another long sentence that will be truncated.`
},
	input: `[truncate(20, '~~~'): example]`,
	output: `This is another lo~~~`,
	note: `This example truncates the string "This is another long sentence that will be truncated." to a maximum length of 20 characters, and appends "~~~" to the end.`
}],
	processor({content, params}) {
		let [ maxLength = 80, suffix = '...' ] = params
		return content.length <= maxLength ? content : content.slice(0, maxLength) + suffix
	},
	variant: `original`
},
	uppercase: {
	name: `uppercase`,
	aliases: [`upper`, `up`],
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Converts a string to uppercase.`,
	kind: `single`,
	syntax: `[uppercase: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to convert to uppercase.`
}],
	examples: [{
	payload: {
	example: `This is a sentence.`
},
	input: `[uppercase: example]`,
	output: `THIS IS A SENTENCE.`,
	note: `This example converts the string "This is a sentence." to uppercase.`
}, {
	payload: {
	site: {
	title: `my website title`
}
},
	input: `[uppercase: site.title]`,
	output: `MY WEBSITE TITLE`,
	note: `This example converts the site title "my website title" to uppercase.`
}],
	processor(req) {
		if(!req.content) { return ''}
		return req.content.toUpperCase()
	},
	variant: `original`
},
	upper: {
	name: `upper`,
	aliases: [`upper`, `up`],
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Converts a string to uppercase.`,
	kind: `single`,
	syntax: `[uppercase: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to convert to uppercase.`
}],
	examples: [{
	payload: {
	example: `This is a sentence.`
},
	input: `[uppercase: example]`,
	output: `THIS IS A SENTENCE.`,
	note: `This example converts the string "This is a sentence." to uppercase.`
}, {
	payload: {
	site: {
	title: `my website title`
}
},
	input: `[uppercase: site.title]`,
	output: `MY WEBSITE TITLE`,
	note: `This example converts the site title "my website title" to uppercase.`
}],
	processor(req) {
		if(!req.content) { return ''}
		return req.content.toUpperCase()
	},
	variant: `alias`,
	alias: `upper`
},
	up: {
	name: `up`,
	aliases: [`upper`, `up`],
	author: `Jesse Traynham`,
	category: `Text`,
	description: `Converts a string to uppercase.`,
	kind: `single`,
	syntax: `[uppercase: property.path]`,
	version: `1.0.0`,
	content: [{
	name: `property.path`,
	type: `string`,
	required: true,
	description: `The path of the property to convert to uppercase.`
}],
	examples: [{
	payload: {
	example: `This is a sentence.`
},
	input: `[uppercase: example]`,
	output: `THIS IS A SENTENCE.`,
	note: `This example converts the string "This is a sentence." to uppercase.`
}, {
	payload: {
	site: {
	title: `my website title`
}
},
	input: `[uppercase: site.title]`,
	output: `MY WEBSITE TITLE`,
	note: `This example converts the site title "my website title" to uppercase.`
}],
	processor(req) {
		if(!req.content) { return ''}
		return req.content.toUpperCase()
	},
	variant: `alias`,
	alias: `up`
},
	cache: {
	name: `cache`,
	author: `Jesse Traynham`,
	category: `Util`,
	description: `Automatically caches the content between the cache tags. If the same content is encountered again, the cached version is used. The cache is automatically invalidated and refreshed when the content changes. Optionally, old cache files can be cleaned up.`,
	kind: `container`,
	syntax: `[cache] ... [/cache]`,
	version: `1.0.0`,
	content: [{
	name: `content`,
	type: `any`,
	required: true,
	description: `The content to be cached.`
}],
	examples: [{
	code: `[cache]This is some content to cache[/cache]`,
	result: `This is some content to cache`,
	comment: `The content will be cached.`
}],
	settings: {
	cacheFolder: `./cache`,
	cacheDuration: 7,
	cacheCleanup: false
},
	processor(req) {
		
		let { cacheFolder, cacheDuration, cacheCleanup } = this.settings
		
		// Create cache directory if it doesn't exist
		if (!fs.existsSync(cacheFolder)) {
			fs.mkdirSync(cacheFolder)
		}
		
		// Cleanup cache if the setting is enabled
		if(cacheCleanup){
			this.cleanupCache(cacheFolder, cacheDuration)
		}
		
		// Generate a checksum from the content
		const contentChecksum = this.getChecksum(req.content);
		const cacheFilePath = path.join(cacheFolder, `${contentChecksum}.cache`)
		
		// If cache file exists and its checksum matches the content's checksum, return the cached content
		if (fs.existsSync(cacheFilePath)) {
			const cacheData = fs.readFileSync(cacheFilePath, 'utf-8')
			const { name } = path.parse(cacheFilePath)
			
			if(contentChecksum === name) {
				return cacheData
			}
		}
		
		// Process the content
		const processedContent = req.engine.merge(req.content, req.payload)
		
		// Cache the processed content
		fs.writeFileSync(cacheFilePath, processedContent, 'utf-8')
		
		// Return the processed content
		return processedContent
		
	},
	getChecksum(str) {
		return crypto
			.createHash('md5')
			.update(str, 'utf8')
			.digest('hex')
	},
	cleanupCache(cacheFolder, cacheDuration) {
		
		fs.readdir(cacheFolder, (err, files) => {
			
			if (err) {
				console.log(`Error reading directory: ${err}`)
				return
			}
			
			files.forEach(file => {
				if(path.extname(file) === '.cache') {
					const filePath = path.join(cacheFolder, file)
					fs.stat(filePath, (err, stats) => {
						if (err) {
							console.log(`Error getting stats of file: ${err}`)
							return
						}
						const fileAgeInMilliseconds = new Date() - stats.birthtime
						const fileAgeInDays = fileAgeInMilliseconds / (1000 * 60 * 60 * 24)
						if (fileAgeInDays > cacheDuration) {
							fs.unlink(filePath, err => {
								if (err) {
									console.log(`Error deleting file: ${err}`)
									return
								}
							})
						}
					})
				}
			})
		})
	},
	variant: `original`
},
	importJSON: {
	name: `importJSON`,
	author: `Jesse Traynham`,
	category: `Util`,
	description: `Imports a JSON file and adds it the to the payload using the provided name or "JSON" by default.`,
	kind: `single`,
	syntax: `[importJSON: 'path/to/file.json'] or [importJSON: name using 'path/to/file.json']`,
	version: `1.0.0`,
	examples: [{
	input: `[importJSON: 'data/user.json']`,
	output: `The content of user.json is now accessible through [JSON] in the template. Example: \`[JSON.name]\``,
	note: `Import JSON file content.`
}, {
	input: `[importJSON: user using data/user.json]`,
	output: `The content of user.json is now accessible through [user] in the template. Example: \`[user.name]\``,
	note: `Import JSON file content and assign it to a specific name.`
}],
	processor(req) {
		
		// Extract the name and path from the request cargo. If not specified, set defaults.
		let name = req.cargo?.using?.name || 'JSON'
		let uri = req.cargo?.using?.value || req.content
		let views = path.resolve(req.payload?._synth.views)
		
		if(!uri){
			return `ERROR: No file specified for importJSON tag`
		}
		
		let parsedURL = this.createURL(uri, views)
		
		if(parsedURL.err){
			return `ERROR: ${parsedURL.err.message} › ${uri}`
		}
		
		// IF FILE
		if(parsedURL.protocol === 'file:'){
			
			let { pathname } = parsedURL
			
			let validExtension = ['.json', '.json5', '.json6'].includes(path.extname(pathname).toLowerCase())
			
			if(!validExtension){
				return `ERROR: Invalid extension › '${path.extname(uri)}'`
			}
			
			// If the JSON file does not exist, return an error.
			if (!fs.existsSync(pathname)) {
				return `ERROR: JSON file does not exist: ${pathname}`
			}
			
			let fileContent = fs.readFileSync(pathname, {encoding:'utf8'})
			
			try {
				req.payload[name] = JSON6.parse(fileContent)
			} catch (error) {
				return `ERROR: Failed to parse JSON: › ${error.message}`
			}
			
			return ''
			
		}
		
		let fileContent = req.engine.fetchSyncJSON(parsedURL.href)
		
		if(fileContent.err){
			return `${fileContent.err.message}`
		}
		
		req.payload[name] = fileContent.value
		
		return ''
		
	},
	createURL(input, base){
		
		let lorry = new Lorry()
		
		input = decodeURIComponent(input).trim()
		
		try {
			let obj = new URL(input, `file://${base}/`)
			return obj
		} catch (e) {
			return lorry.Throw(400, e.message)
		}
	},
	variant: `original`
},
	include: {
	name: `include`,
	author: `Jesse Traynham`,
	category: `Util`,
	description: `Include a template partial from a specified file and merge it with the current template.`,
	kind: `single`,
	syntax: `[include: 'path/to/partial']`,
	version: `1.0.0`,
	examples: [{
	input: `[include: 'partials/header.synth']
Welcome to our website!
[include: 'partials/footer.synth']
`,
	output: `Heder and footer text retrieved.`,
	note: `Include file content from partials.`
}],
	processor(req) {
		if (req.engine.env.platform === 'node') {
			return this.onProcessNode(req)
		} else {
			return this.onProcessBrowser(req)
		}
	},
	onProcessNode(req) {
		
		// TODO: Add ability to get from a url using fetch?
		
		// Check if content (the file to be included) is provided. If not, return an error message.
		if (!req.content) {
			return 'ERROR: No file specified for include tag'
		}
		
		// Check if the included file has an extension. If not, return an error message.
		if(!path.extname(req.content)){
			return 'ERROR: Include file name requires an extension.'
		}
// MOVE TO REQ.ENGINE.ENV.VIEWS??????		
		// Generate the absolute path of the file to be included.
		let includePath = path.join(req.payload._synth.views, req.content)
		
		// Check if the file to be included exists. If not, return an error message.
		if (!fs.existsSync(includePath)) {
			return `ERROR: Include file does not exist: ${includePath}`
		}
		
		// If the file exists, read its content.
		let fileContent = fs.readFileSync(includePath, {encoding:'utf8'})
		
		// -removeTabs flag
		if(req.cargo.flags.includes('removeTabs')){
			fileContent = fileContent.replaceAll('\t', '')
		}
		
		// Process the included file content using the engine, passing in the file's content and the payload.
		// This allows nested includes and processing of other tags within the included file.
		const mergedContent = req.engine.process(fileContent, req.payload)
		
		// Return the processed content of the included file.
		return mergedContent
		
	},
	onProcessBrowser(req) {
		
		if (!req.content) return 'ERROR: No file specified for include tag'
		
		//const content = this.fetchSync(req.content)
		const content = req.engine.fetchSync(req.content)
		const processed = req.engine.process(content, req.payload)
		
		if(req.cargo.flags.includes('markdown')){
			return req.engine.runPlugin('markdown', { content: processed})
		} else {
			return processed
		}
		
	},
	variant: `original`
},
	log: {
	name: `log`,
	author: `Jesse Traynham`,
	category: `Util`,
	description: `Logs a message value to the console.`,
	kind: `single`,
	syntax: `[log: 'Something amazing just happened!']`,
	version: `1.0.0`,
	content: [{
	name: `message`,
	type: `string`,
	description: `The message to log to the console.`,
	required: true
}],
	examples: [{
	input: `[log: "Hello, World!"]`,
	note: `Use the log plugin to log a string.`,
	output: `Logs "Hello, World!" to the console`
}, {
	payload: {
	property: {
	path: `propertyValue`
}
},
	input: `[log: property.path]`,
	note: `Use the log plugin to log the value of an object's property.`,
	output: `Logs the value of property.path to the console`
}, {
	payload: {
	property: {
	path: `propertyValue`
}
},
	input: `[log: 'THE PATH:', property.path]`,
	note: `Use the log plugin to log the value of an object's property with a grouping.`,
	output: `Logs the value of property.path to the console`
}, {
	payload: {
	property: {
	path: `propertyValue`
},
	another: `value`
},
	input: `[log: 'THE PATH:', property.path]`,
	note: `Use the log plugin to log the multiple objects with a grouping.`,
	output: `Logs the value of property.path to the console`
}, {
	payload: {
	property: {
	path: `propertyValue`,
	name: `Bob`
}
},
	input: `[log: 'THE VALUES:', property, -table]`,
	note: `Use the log plugin to log object as a table with a grouping.`,
	output: `Logs the value of property.path to the console`
}],
	processor(req) {
		
		let group
		let log = console.log
		
		// AUTO GROUP
		if(typeof req.contents[0] == 'string' & req.contents.length > 1){
			group = req.contents[0]
			req.contents.shift()
		}
		
		// AS TABLE
		if(req.cargo.flags.includes('table')){
			log = console.table	
		}
		
		if(group){
			console.group(group)
			log(...req.contents)
			console.groupEnd()
			return ''
		}
		
		log(...req.contents)
		return ''
		
	},
	variant: `original`
},
	man: {
	name: `man`,
	author: `Jesse Traynham`,
	category: `Info`,
	description: `Display a manual.`,
	kind: `single`,
	syntax: `[man: "plugin"]`,
	version: `1.0.0`,
	docs: {
	flags: {
	html: `Return out put in html`,
	text: `Return out put in text`,
	markdown: `Return out put in markdown`
}
},
	content: [],
	examples: [{
	payload: {
	_request: {
	path: `/home/about`
}
},
	input: `[breadcrumbs]`,
	output: `<div style="--bs-breadcrumb-divider: '›';" aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="/home">home</a></li><li class="breadcrumb-item">about</li></ol></div>`,
	note: `This example shows how breadcrumb navigation is generated for the path "/home/about".`
}],
	processor(req) {
		
		let plugin = req.engine.plugins[req.content]
		
		if(!plugin){
			console.log(`${req.content} not found`)
			return `${req.content} not found`
		}
		
		if(!plugin.docs){
			console.log(`${req.content} docs not found`)
			return `${req.content} docs not found`
		}
		
		let { flags } = req.cargo
		
		// TEXT
		if(flags.includes('text')){
			return this.onText(plugin, req)
			//return console.log('do text format')
		}
		
		// MARKDOWN
		if(flags.includes('markdown')){
			return this.onMarkdown(plugin, req)
			//return console.log('do markdown format')
		}
		
		// HTML
			//console.log('do html format')
		
		return this.onHTML(plugin, req)
		
		//let theThing = req.engine.plugins[req.content]
		

		
		//return req.content + ' content to come.'
		

	},
	onText(plugin) {
		console.log(`...doing man text for ${plugin.name}`)
	},
	onMarkdown(plugin) {
		console.log(`...doing man markdown for ${plugin.name}`)
	},
	onHTML(plugin, req) {
		
		console.log(`...doing man html for ${plugin.name}`)
		
		let template = `
			
			[markdown]
				
				# [name] ([version])
				
				[if: description]
				> [description]
				[/if]
				
				---
					
				| Field         | Value      |
				|---------------|------------|
				| **Author**    | [author]   |
				| **Category**  | [category] |
				| **Kind**      | [kind]     |
				| **Aliases**   | [aliases]  |
				
				## Syntax
				[encode_delimiters: docs.syntax]
				
				## Flags
				
				[if: docs.flags]
					| Field         | Value      |
					|---------------|------------|
					[each: flag using docs.flags]
						| **-[flag.key]**   | [flag.value]  |
					[/each]
				[else]
					_None_
				[/if]
				
				## Content
				
				[if: kind == 'container']
					The **content** of a container tag is the portion between the opening and closing tags.
				[/if]
				
				[if: docs.content]
					[each: field using docs.content]
						| Field         | Value      |
						|---------------|------------|
						| **Type**          | [field.type]         |
						| **Required**      | [field.required]     |
						| **Description**   | [field.description]  |
					[/each]  
				[else]
					_None_
				[/if]
				
				tess
				[if: docs.examples]ting
					[each: example using docs.examples]						
						| Field         | Value      |
						|---------------|------------|
						| **Payload**   | [example.payload]               |
						| **Template**  | [code][example.template][/code] |
						| **Output**    | [example.output]                |
						| **Note**      | [example.note]                  |
					[/each]  
				[/if]
				
				
			[/markdown]
			
			`
			/*	
				### Content
				[docs.content]
				
				###Examples
				[stringify: docs.examples]
				
			
		`*/
		
		let output = req.engine.process(template, plugin)
		
		
		return output
		
	},
	variant: `original`
},
	pay: {
	name: `pay`,
	author: `Jesse Traynham`,
	category: `Info`,
	description: `Dispaly payload.`,
	kind: `single`,
	syntax: `[pay]`,
	version: `1.0.0`,
	content: [],
	examples: [{
	payload: {
	_request: {
	path: `/home/about`
}
},
	input: `[breadcrumbs]`,
	output: `<div style="--bs-breadcrumb-divider: '›';" aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="/home">home</a></li><li class="breadcrumb-item">about</li></ol></div>`,
	note: `This example shows how breadcrumb navigation is generated for the path "/home/about".`
}],
	processor(req) {
		
		let md = (content) => req.engine.runPlugin('md', {content})
		let md_code = (content) => req.engine.runPlugin('md', {content: '\n```json\n' + content + '\n```\n'})
		
		if(req.cargo.flags.includes('keys')){
			let content =  '## Payload Keys\n' + Object.keys(req.payload).map(key => `* ${key}`).join('\n')
			return md(content)
		}
		
		if(req.contents.length > 0){
			let out =  req.contents.map(content => '\n```json\n' + JSON.stringify(content, null, 2) + '\n```\n' )
			return md(out.join(''))
		}
		
		/*
			# TODO:
			* Should session be there?
			* Session is in both the root and in locals.
			* Should there be an option for --showAll
			* Use encode delimiter for replacing delims.
		*/
		let exclusions = [
			'textSynth',
			'_layoutStack',
			'settings',
			'_locals',
			'_synth'
		]
		
		let pay = Object.keys(req.payload).reduce((acc, key) => {
			if (!exclusions.includes(key)) { acc[key] = req.payload[key] }
			return acc;
		}, {})
		
		return md_code( JSON.stringify(pay, null, 2).replaceAll('[', '\\[').replaceAll(']', '\\]') )
		
	},
	variant: `original`
},
	plat: {
	name: `plat`,
	author: `Jesse Traynham`,
	category: `Util`,
	description: `Return the platform. This is just a test.`,
	kind: `single`,
	syntax: `[plat]`,
	version: `1.0.0`,
	content: [{
	name: `message`,
	type: `string`,
	description: `The message to log to the console.`,
	required: true
}],
	examples: [{
	input: `[log: "Hello, World!"]`,
	note: `Use the log plugin to log a string.`,
	output: `Logs "Hello, World!" to the console`
}, {
	payload: {
	property: {
	path: `propertyValue`
}
},
	input: `[log: property.path]`,
	note: `Use the log plugin to log the value of an object's property.`,
	output: `Logs the value of property.path to the console`
}],
	processor(req) {
		
		if(req.engine.env.platform == 'node'){
			return this.onProcessNode(req)
		} else {
			return this.onProcessBrowser(req)
		}
		
	},
	onProcessNode(req) {
		console.log('REQ::', req)
		return 'node'
	},
	onProcessBrowser(req){
		console.log('REQ::', req)
		return 'browser'
	},
	variant: `original`
},
	var: {
	name: `var`,
	author: `Jesse Traynham`,
	category: `Util`,
	description: `Logs a message value to the console.`,
	kind: `single`,
	syntax: `[log: 'Something amazing just happened!']`,
	version: `1.0.0`,
	content: [{
	name: `message`,
	type: `string`,
	description: `The message to log to the console.`,
	required: true
}],
	examples: [{
	input: `[log: "Hello, World!"]`,
	note: `Use the log plugin to log a string.`,
	output: `Logs "Hello, World!" to the console`
}, {
	payload: {
	property: {
	path: `propertyValue`
}
},
	input: `[log: property.path]`,
	note: `Use the log plugin to log the value of an object's property.`,
	output: `Logs the value of property.path to the console`
}],
	processor(req) {
		
		if(!Object.keys(req.cargo.assignment).length){
			return 'ERROR: "var" tag requires a valid asignment parameter.'
		}
		
		if(!req.payload._variables) {
			req.payload._variables = {}
		}
		
		for (const key in req.cargo.assignment) {
			req.payload[key] = req.cargo.assignment[key]
			req.payload._variables[key] = req.cargo.assignment[key] // NOT CURRENTLY USED. RESERVED FOR FUTURE USE.
		}
		
		return ''
		
	},
	variant: `original`
}
};
