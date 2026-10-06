import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const metadata = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

function command(args, cwd) {
	const result = spawnSync('npm', args, { cwd, encoding: 'utf8' })
	if (result.status !== 0) throw new Error(result.stderr || result.stdout || String(result.error))
	return result.stdout
}

if (process.argv.includes('--consumer')) {
	const require = createRequire(join(process.cwd(), 'package.json'))
	const { default: Mote, Mote: namedMote, expressMote, expressTextSynthEngine } = await import(pathToFileURL(require.resolve(metadata.name)))
	assert.equal(Mote, namedMote)
	assert.equal(typeof expressTextSynthEngine, 'function')
	const mote = await Mote({ views: 'views' })
	assert.equal(mote.merge('Hello, [name]!', { name: 'World' }), 'Hello, World!')
	assert.equal(mote.merge('---json\n{"title":"Book"}\n---\n[page.title]'), 'Book')
	assert.equal(mote.merge('---\nmd: true\n---\n# Book'), '<h1>Book</h1>\n')
	assert.equal(mote.mergeFile('page.md').trim(), '<main>Book</main>')
	const { default: express } = await import(pathToFileURL(require.resolve('express')))
	const app = express()
	await expressMote(app, { views: 'views' })
	app.set('views', join(process.cwd(), 'views'))
	const html = await new Promise((resolve, reject) => {
		app.render('page', {}, (error, result) => error ? reject(error) : resolve(result))
	})
	assert.equal(html.trim(), '<main>Book</main>')
	console.log(`Consumer smoke passed: ${metadata.name}@${metadata.version} on ${process.version}`)
} else {
	const workspace = mkdtempSync(join(tmpdir(), 'mote-release-'))
	const packed = JSON.parse(command(['pack', '--json', '--pack-destination', workspace], root))[0]
	for (const file of ['CHANGELOG.md', 'docs/frontmatter-migration.md', 'src/dist/mote.js']) {
		assert.ok(packed.files.some(entry => entry.path === file), `Missing package file: ${file}`)
	}
	assert.ok(!packed.files.some(entry => /(_build\.sh|example\.js|testing\.js)$/.test(entry.path)))
	const consumer = join(workspace, 'consumer')
	mkdirSync(join(consumer, 'views'), { recursive: true })
	writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module' }))
	writeFileSync(join(consumer, 'views', 'page.md'), '---\nlayout: main.lay\nblock: content\nmd: false\ntitle: Book\n---\n[page.title]')
	writeFileSync(join(consumer, 'views', 'main.lay'), '<main>[block: "content"]Default[/block]</main>')
	command(['install', '--omit=dev', '--no-audit', '--no-fund', join(workspace, packed.filename)], consumer)
	const result = spawnSync(process.execPath, [fileURLToPath(import.meta.url), '--consumer'], { cwd: consumer, stdio: 'inherit' })
	assert.equal(result.status, 0, 'Installed package smoke failed')
	const audit = JSON.parse(command(['audit', '--omit=dev', '--json'], consumer))
	assert.equal(audit.metadata.vulnerabilities.total, 0)
	console.log(`Production audit clean. Release tarball: ${join(workspace, packed.filename)}`)
}
