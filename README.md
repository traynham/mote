# Mote

Mote (MOdular Template Engine, formerly TextSynth) is an extensible text templating engine with an intuitive syntax and built-in plugin support, enabling seamless merging and manipulation of data to generate dynamic content for various applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Plugins](#plugins)
  - [Creating Custom Plugins](#creating-custom-plugins)
  - [Express.js Integration](#expressjs-integration)
- [Options](#options)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Features

- Simple and intuitive templating syntax
- Built-in support for plugins, allowing for powerful text manipulation
- Customizable opening and closing tags
- Ability to remove tabs and trailing new lines from the output
- Express.js integration

## Installation

Node.js 24 or newer is required. This beta is tested on Node.js 24.21.0.

Until this project's npm package name is finalized, install from its GitHub
repository. The registry package named `mote` currently belongs to another project.

```bash
npm install github:traynham/mote
```

## Usage

### Basic Usage

Import the Mote library and create a new instance:

```javascript
import { Mote } from 'mote';

const mote = await Mote();

const template = 'Hello, [name]!';
const data = { name: 'World' };

const output = mote.merge(template, data);
console.log(output); // Output: Hello, World!

```

### Plugins

Mote comes with built-in plugins that can be used to manipulate text within your templates:

```javascript
import { Mote } from 'mote';

const mote = await Mote();

const template = 'Hello, [uppercase:name]!';
const data = { name: 'world' };

const output = mote.merge(template, data);
console.log(output); // Output: Hello, WORLD!

```

### Creating Custom Plugins

Create custom plugins to extend Mote's functionality:

```javascript
import { Mote } from 'mote';

const mote = await Mote();

const reversePlugin = {
	name: 'reverse',
	kind: 'single',
	processor: ({ content }) => content.split('').reverse().join(''),
};

mote.use(reversePlugin);

const template = 'Hello, [reverse:name]!';
const data = { name: 'world' };

const output = mote.merge(template, data);
console.log(output); // Output: Hello, dlrow!

```

### Express.js Integration

Use Mote as a templating engine in your Express.js application:

```javascript
import express from 'express';
import { expressMote } from 'mote';

const app = express();
const mote = await expressMote(app, {
	extensions: ['md', 'lay'],
	viewEngine: 'md'
});

// Optional: expose the instance to your routes.
app.set('textMerger', mote);

// Your Express.js routes and configurations

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
```

## Options

Mote can be customized using the following options:

- `delimiters`: Array of `[open, close]` for merge tags (default: `['[', ']']`)
- `flush_comments`: Remove comments before processing (default: `true`)
- `removeTabs`: Remove leading tabs before processing (default: `true`)
- `debug`: Enable debug logging (default: `false`)
- `plugins`: Custom plugins directory name (default: `plugins`)
- `views`: Views directory name (default: `views`)

## API

- `Mote(options)`: Creates a new instance (alias of default `TextSynth` export)
- `expressMote(app, options)`: Creates a new instance and registers Express view engines
- `expressTextSynthEngine(filePath, options, callback)`: Low-level Express view engine (legacy name)
- `mote.merge(template, data)`: Merges the template and data, returning the merged output
- `mote.use(plugin)`: Adds a plugin to the Mote instance
- `mote.mergeFile(filePath, data)`: Renders a template file with the given data

## Beta.4 Migration

Frontmatter now uses the maintained Eleventy gray-matter fork with YAML 4.
YAML and JSON, dates, aliases, layouts, blocks, and Markdown are covered by
regression tests. See [frontmatter migration notes](docs/frontmatter-migration.md)
for indentation, numeric, binary, and JavaScript-frontmatter compatibility changes.

Production dependencies have a clean npm audit. A development-only `sprintf-js`
advisory remains through Jest's coverage tooling; do not use forced dependency
downgrades to clear it. See [release notes](CHANGELOG.md).

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## License

Mote is released under the [MIT License](LICENSE).
