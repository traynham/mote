{

	var { DEBUG, engine, payload, tags } = options

	const MERGE_STOP_WORDS = new Set(['else'])
	
	function isSingle(tag) {
		if(MERGE_STOP_WORDS.has(tag)) return false
		let theTag = options.tags?.[tag]
		if(!theTag) return false
		return theTag.kind ? theTag.kind === 'single' : true
	}
	
	function isContainer(tag) {
		return options.tags?.[tag]?.kind === 'container'
	}
	
	function debug(title, message){
		if (DEBUG) console.log(`DEBUG › ${title} ›`, message)
	}

	function processContent(content, cargo) {

		let contents = Array.isArray(content) ? content : [content];
		let out = []
		contents = contents.map(item => {
			switch (item.type) {
				case 'attribute':
					return ''
				//	return item
				case 'flag':
					cargo.flags.push(item.value)
				case 'null':
					return null
				case 'undefined':
					return undefined
				case 'identifier':
					return _getValueFromPath(item.value, payload)
				default:
					return item.value
			}
		})

		if(Array.isArray(content)){

			content?.forEach( param => {
					if(param.type == 'attribute'){
						param.value = _getValueFromPath(param.value, payload) || param.value
					cargo.assignment[param.key] = param.value
					cargo.attributes[param.key] = param.value
				}
				if(param.type == 'using'){ cargo.using = param}
			})
		}

		contents = contents.filter(Boolean) // REMOVE FALSY
		return contents

	}

	function _getValueFromPath(item, payload) {
		
		if (!item) return ''
		
		// If item is already a raw value (number, boolean), return as is
		if (
			typeof item === 'number' ||
			typeof item === 'boolean' ||
			item === null ||
			item === undefined
		) {
			return item
		}
		
		// Accept either a segments object or a string (legacy)
		let segments = item
		
		if (item.type === 'segments') {
			segments = item.segments
		} else if (typeof item === 'string') {
			// Fallback: handle as dot-path
			return item.split('.').reduce((obj, key) => obj?.[key], payload)
		} else {
			return item.value || ''
		}
		
		let value = payload
		
		for (let segment of segments) {
			
			if (segment.type === 'identifier' || segment.type === 'dot') {
				value = value?.[segment.value]
			}
			else if (segment.type === 'plugin') {
				
				const plugin = tags[segment.name]
				
				// ON INVALID PLUGIN
				if (!plugin || typeof plugin.processor !== 'function') {
					debug('PLUGIN NOT FOUND', `Plugin "${segment.name}" not found or invalid—skipped.`)
					continue
				}
				
				// ON NOT FOUND IN SINLGE, ASSUME CONTAINER AND SKIP.
				if (!isSingle(segment.name)) {
					debug('PLUGIN SKIPPED', `Plugin "${segment.name}" is a container and was skipped in value chain.`)
					continue
				}
				value = plugin.processor({
					content: value,
					payload,
					params: segment.args?.map(a => a.value !== undefined ? a.value : a)
				})
			}
			else if (segment.type === 'bracket') {
				value = value?.[segment.value]
			}
			
		}
		
		return value
	}

	function resolveCoalesceValue(item) {
		if (item && typeof item === 'object') {
			if (Object.prototype.hasOwnProperty.call(item, 'value')) {
				return item.value
			}
		}
		return item
	}
	
	function _evaluateCondition(condition, payload) {
		
		let { left, operator, right} = condition
		
		const leftValue = _getValueFromPath(left.value, payload)
		left = (leftValue !== undefined) ? leftValue : left.value
		
		const rightValue = _getValueFromPath(right.value, payload)
		right = (rightValue !== undefined) ? rightValue : right.value
		
		debug('_EVALUATECONDITION() :: TRUTHY TEST', {left, operator, right})
		
		// CATCH TRUTHY VALUES.
		if (left && !operator && !right) return true;
		
		const OPS = {
			'=='  : (l, r) => l == r,
			'===' : (l, r) => l === r,
			'!='  : (l, r) => l != r,
			'!==' : (l, r) => l !== r,
			'<'   : (l, r) => l < r,
			'>'   : (l, r) => l > r,
			'<='  : (l, r) => l <= r,
			'>='  : (l, r) => l >= r,
		}
		
		if (operator in OPS) return OPS[operator](left, right)
		
		// Default fallback for unknown operators
		return false;
		
	}

	function processCargo(params) {
		
		let cargo = {
			assignment: {},
			attributes: {},
			flags: [],
			classes: [],
			condition: null,
			extra: [],
			id: '',
			params: [],
			using: null,
			values: []
		}

		if(params.length == 0){
			return cargo
		}

		params = Array.isArray(params) ? params : [params];

		params.forEach(param => {

			if(!param){ return undefined }

			switch (param.type) {
				case 'attribute':   cargo.attributes[param.key] = param.value; break;
				case 'boolean':     cargo.values.push(param.value); break;
				case 'classes':     cargo.classes.push(param.value); break;
				case 'condition':   cargo.condition = param.value; break;
				case 'id':          cargo.id = param.value; break;
				case 'identifier':  cargo.values.push(_getValueFromPath(param, payload)); break;
				case 'flag':        cargo.flags.push(param.value); break;
				case 'objectField': cargo.params.push(param.value); break;
				case 'null':        cargo.params.push(null); break;
				case 'number':      cargo.values.push(param.value); break;
				case 'string':      cargo.values.push(param.value); break;
				case 'undefined':   cargo.params.push(undefined); break;
				case 'using':       cargo.using = param; break;
				default:            cargo.extra.push(param);
			}
		})

		return cargo

	}

}


start "Start"
	=	@(elements:expression+)

expression "Expression"
	=	@( rawCodeElement )
	/	@( text )
	/	@( tag )
	/	@( mal )
	/	@( containerTag )
	/	@( merge )
	/	@( bracketText )

rawCodeElement "Raw Code Element"
	=	literal:$(scriptElement / styleElement)
		{
			return {
				type: 'text',
				value: literal,
				text: literal,
				render: literal
			}
		}

scriptElement "Script Element"
	=	"<script" (!">" .)* ">" (!"</script>" .)* "</script>"

styleElement "Style Element"
	=	"<style" (!">" .)* ">" (!"</style>" .)* "</style>"

// MERGE
merge "Merge Tag"

	= ternary
	/ coalesce
	/ tagName:merge_identifier
		&{ 
			// only match if it's not a container tag *and* not a reserved word such as "else"
			return !isContainer(tagName.value) 
			&& !MERGE_STOP_WORDS.has(tagName.value);
		}	
		{
			
			debug('TRIGGER:: MERGE', tagName)

			if(tagName.type == 'identifier') {
				return {
					render: _getValueFromPath(tagName.value, payload),
					text: text()
				}
			}

			// MAY NOT BE NEEDED IF NEXT SECTION IS FIXED.
			if(tagName.type == 'objectField') {
				return {
					render: tagName.value,
					text: text()
				}
			}

			return {
				render: tagName.value.value, // FIX THIS!!!
				text: text()
			}

		}

coalesce "Coalesce"
	= "[" _ head:coalesceTerm _ "||" _ tail:coalesceTerm rest:(_ "||" _ coalesceTerm)* _ "]" {
			let values = [head, tail, ...rest.map(item => item[3])]
			let resolved = values.map(item => resolveCoalesceValue(item))
			let out = resolved[0]

			for (let i = 1; i < resolved.length; i++) {
				if (out) { break }
				out = resolved[i]
			}

			return {
				render: out,
				text: text()
			}
		}

ternary "Ternary"
	= "[" _ cond:logicalOrExpression _ "?" _ truthy:coalesceTerm _ falsyPart:(_ ":" _ coalesceTerm)? _ "]" {
			let condition = resolveCoalesceValue(cond)
			let truthyValue = resolveCoalesceValue(truthy)
			let falsyValue = falsyPart ? resolveCoalesceValue(falsyPart[3]) : ''
			let out = condition ? truthyValue : falsyValue

			return {
				render: out,
				text: text()
			}
		}

coalesceTerm "Coalesce Term"
	=	objectField
	/	quotedText
	/	boolean
	/	number
	/	nullLiteral
	/	undefinedLiteral

bracketText "Bracket Text"
	=	literal:$("[" (bracketQuotedText / (!"]" .))* "]")
		&{
			const inner = literal.slice(1, -1).trim()
			const match = inner.match(/^\/?([a-zA-Z_][a-zA-Z0-9_]*)/)

			if (!match) { return true }

			const name = match[1]
			return !tags?.[name] && !MERGE_STOP_WORDS.has(name)
		}
		{
			return {
				type: 'text',
				value: literal,
				text: literal,
				render: literal
			}
		}

bracketQuotedText "Bracket Quoted Text"
	=	'"' ( '\\"' / [^"] )* '"'
	/	"'" ( "\\'" / [^'] )* "'"

// MOVE TO SIGNATURE IDEA??
merge_identifier "Merge Identifier"
	=	"[" _ head:[a-zA-Z_] tail:[a-zA-Z0-9._]* _ "]" {
			const tagName = `${head}${tail.join('')}`
			debug('TRIGGER :: MERGE IDENTIFIER 1', tagName)
			return { type: 'identifier', value: tagName } 
		}
	
	/	"[" _ tagName:objectField _ "]" {
			debug('MERGE IDENTIFIER 2', tagName)
			return tagName
		}


single_signatures

	// SINGLE TAG
	=	"[" tagName:identifier &{ return isSingle(tagName.value) } ":" _ content:(arguments) _ "]"
		{
			debug('SINGLE TAG', tagName)
			return { tagName, type: 'single', params: [], content, signature: 'Single Tag' }
		}

	// SINGLE TAG WITH NO ARGS
	/	"[" tagName:identifier &{ return isSingle(tagName.value) } _ "]"
		{
			debug('SINGLE TAG WITH NO ARGS', tagName)
			return { tagName, type: 'single', params: [], content: [], signature: 'Single Tag without args' }
		}

	// SINGLE TAG WITH PARAMS
	/	"[" tagName:identifier &{ return isSingle(tagName.value) } params:parameters ":" _ content:(objectField / arguments) "]"
		{
			debug('SINGLE TAG WITH PARAMS', tagName)
			return { tagName, type: 'single-with-params', params, content, signature: 'Single Tag With Params' }
		}


// SINGLES
tag "Single Tag"

	=	sig:single_signatures
		{
			
			debug('TRIGGER :: SINGLE PROC', sig)
			
			let {tagName, type, params, content} = sig
			
			params = params.map( param => {
				if(param.value == 'true'){ return true}
				if(param.value == 'false'){ return false}
				if(param?.type == 'identifier'){ return _getValueFromPath(param.value, payload)}
				return param.value 
			})

			let cargo = processCargo(params)
			let contents = processContent(content, cargo)

			let req = {
				name: tagName.value,
				params: params, 
				content: contents[0],
				contents: contents,
				payload: payload,
				engine,
				cargo: cargo
			}
			
			let render = tags[tagName.value].processor(req)
			
			return {
				render: render,
				text: text()
			}

		}


// Malformed
mal "Malformed Matches"

	// ERROR IF NO CONTENT.
	=	"[" tagName:identifier &{ return isSingle(tagName.value) } ":" "]" {
			debug('TRIGGER :: MALFORMED MATCH', tagName)
			return {render: `ERROR: "${tagName.value}" tag expected content.`}
		}


container_signatures "Container Signatures"

	// SIGNATURE › IGNORE
	= 	"[ignore]"
			content:(!'[/ignore]' .)*
		"[/ignore]"
		{
			debug('TRIGGER :: IGNORE CONTENT')
			return {
				tagName: {value: 'ignore'},
				close: {value: 'ignore'},
				params: [],
				content: content.map(item => item[1]).join('')
			}
		}

	// SIGNATURE › CONTAINER › WITHOUT CONTENT
	/	"[" tagName:identifier &{ return isContainer(tagName.value) }  ":" _ params:arguments _ "]" _ "[/" close:identifier "]"
		{
			debug('TRIGGER :: CONTAINER WITHOUT CONTENT', tagName)
			return { tagName, close, params, content: [] }
		}
		
	// SIGNATURE › CONTAINER › IF
	/	"[if:" _ cond:ifArguments _ "]" _
			content:expression*
			elseIfBranches: (ElseIfBranch)*
			elseBranches: (ElseBranch)*
		"[/if]" _
		{
			
			debug('TRIGGER :: CONTAINER', 'IF')
			debug('TRIGGER :: CONTAINER WITH ARGS › PARAMS', cond)
			
			let chosen = null
			let params = [{ type: 'condition', value: false, default: true }]
			
			debug('TRIGGER :: CONTAINER › ELSEBRANCHES', elseBranches)
			
			let lastElse = elseBranches.length > 0 ? elseBranches[elseBranches.length - 1] : null;
			
			debug('TRIGGER :: CONTAINER › LAST ELSE', lastElse)
			
			
			// Determine which branch to render
			if (cond[0]?.value) {
				chosen = content
				//chosen = content.splice(1)
				params = cond
				debug('TRIGGER :: CONTAINER › IF IS TRUE', cond)
				debug('TRIGGER :: CONTAINER › IF IS TRUE CONTENT', chosen)
			} else {
				for (const b of elseIfBranches) {
					if (b.condition[0]?.value) {
						chosen = b.content
						params = b.params
						//chosen = b
						break
					}
				}
			}
			
			if (!chosen && lastElse) {
				chosen = lastElse.content
				params = [{ type: 'condition', value: true }]
			}
			
			
			debug('TRIGGER :: CONTAINER › IF STATEMENT CONTENT', chosen)
			
			return {
				tagName: { type: 'identifier', value: 'if' },
				close: { type: 'identifier', value: 'if' },
				params: params,
				content: chosen
			}
			
		}
		
		
	// SIGNATURE › CONTAINER › WITH ARGS??
	/	"[" tagName:identifier &{ return isContainer(tagName.value) }  ":" _ params:arguments _ "]" nl
			content:expression*
		"[/" close:identifier "]" nl
		{
			debug('TRIGGER :: CONTAINER WITH ARGS', tagName)
			debug('TRIGGER :: CONTAINER WITH ARGS › PARAMS', params)
			return { tagName, close, params, content }
		}
		
		
	// SIGNATURE › CONTAINER SELF CLOSING › WITH ARGS
	/	"[" tagName:identifier &{ return isContainer(tagName.value) }  ":" _ params:arguments _ [/.] _ "]"
		{
			debug('TRIGGER :: CONTAINER › SELF CLOSING › WITH ARGS', tagName)
			return { 
				tagName, 
				close: {type: 'identifier', value: tagName.value}, 
				params,
				content: [{type: 'string', value: ''}]
			}
			
		}
		
	// SIGNATURE › CONTAINER › WITHOUT COLON, WITH ARGS
	/	"[" tagName:identifier &{ return isContainer(tagName.value) } _ params:arguments? "]" nl
			//content:(expression* / _)
			content:expression*
		"[/" close:identifier "]" nl
		{
			debug('TRIGGER :: CONTAINER WITHOUT COLON, WITH ARGS', tagName)
			debug('TRIGGER :: CONTAINER WITHOUT COLON, WITH ARGS › CONTENT', content)
			//return { tagName, close, params: params || [], content }
			return { tagName, close, params: params, content }
		}


// CONTAINER
containerTag "Container Tag"

	=	sig:container_signatures
		{
			
			debug('TRIGGER :: CONTAINER PROC', sig)
			
			let {tagName, close, params, content} = sig
			
			if(tagName.value == 'ignore'){
				return {render: content}
			}
			
			if (tagName.value !== close.value) {
				throw new Error(`CONTAINER › Mismatched tags ${tagName.value} and ${close.value}`);
			}
			
			let cargo = processCargo(params)
			
			let req = {
				name: tagName.value,
				params: params.map( param => {
					if(param.value == 'true'){ return true}
					if(param.value == 'false'){ return false}
					if(param.type == 'identifier'){ return _getValueFromPath(param, payload)}
					if(param.type == 'objectField'){ return param.value}
					return param 
				}), 
				//content:  content ? content.map(e => e.text).join('') : '',
				content: content ? content.map(e => e.render).join('') : '',
				//contentRaw: content || [],
				contentRaw:  content ? content.map(e => e.text).join('') : '',
				cargo,
				payload,
				engine
			}
			
			// RUN PLUGIN.
			let render = tags[tagName.value].processor(req)
			
			return {
				render: render,
				text: text()
			}
		}


parameters
	= "(" @params:arguments ")"
	/ "(" _ ")"


// LIST OF ARGS, DELIMITED.
arguments
	= arg|..,delimiter|
	
ifArguments
	= ifArg|..,delimiter|

delimiter
	=	_ [, ] _

ifArg
	=	logicalOrExpression

arg
//	=	logicalAndExpression
//	/	logicalOrExpression
//	/	condition
	=	attribute
	/	quotedText
//	/	flag
//	/	classPattern
//	/	idPattern
	/	usingPattern
	/	boolean
	/	objectField
	/	identifier
	/	index
	/	number
	/	nullLiteral
	/	undefinedLiteral
//	/	otherValue
	
// SINGLE/DOUBLE QUOTED
quotedText
	=	'"' chars:[^"]* '"' { return { type: 'string', value: chars.join('') } }
	/	"'" chars:[^']* "'" { return { type: 'string', value: chars.join('') } }


pathSegment
	= "." func:pluginCall { return [{type: 'plugin', name: func.name, args: func.args}]; }
	/ func:pluginCall { return [{type: 'plugin', name: func.name, args: func.args}]; }
    /	"." segment:identifier {
			let value = segment.value.split('.').map(val => {
				return {type: 'dot', value: val}
			})
			return value
		}
	/	segment:(identifier / quotedText / number) {
			let value = _getValueFromPath(segment.value, payload) || segment.value
			return [{ type: "bracket", value }];
		}
	/	"[" segment:(identifier / quotedText / number) "]" {
			let value = _getValueFromPath(segment.value, payload) || segment.value
			return [{ type: "bracket", value }];
		}

path
	= segments:pathSegment* {
		return { type: "segments", segments: segments.flat() }
    }

pluginCall
	= name:identifier "(" _ ")" { return {type: 'plugin', name: name.value, args: []}; }
	/ name:identifier "(" args:arguments ")" { return {name: name.value, args}; }
	
	
// RENAME TO PROPERTYPATH?
objectField

	=	obj:identifier path:path {

		/*
		let root = obj.value.split('.').map(item => {
			return {type: 'identifier', value: item}
		})

		let segments = { type: "segments", segments: [...root, ...path.segments] };

		return {type: 'objectField', value:_getValueFromPath(segments, payload)}
		*/
		
		let segments = { type: "segments", segments: [obj, ...path.segments] };
		return {type: 'objectField', value:_getValueFromPath(segments, payload)}

    }

	/	obj:identifier "[" field:(identifier / quotedText / number) "]" {
			let path = _getValueFromPath(obj, payload)
			let val = _getValueFromPath(field, payload)
			return { type: 'objectField', value: path[val]}
		}



identifier
	=	head:[a-zA-Z_] tail:[a-zA-Z0-9_]* { return { type: 'identifier', value: head + tail.join('') } }
//	=	head:[a-zA-Z_] tail:[a-zA-Z0-9._]* { return { type: 'identifier', value: head + tail.join('') } }

index
	=	"[" i:[0-9]+ "]" { return { type: 'index', value: parseInt(i.join(''), 10) }; }

number "Number"
	=	number:[0-9]+ { return { type: "number", value: parseInt(number.join(''), 10) }}

boolean "Boolean"
	=	boolean:('true' / 'false') { return {type: 'boolean', value: boolean === 'true' }}


escapedChar
	=	"\\" char:[\[\]] { return '\\' + char }

charSequence
    =	chars:(escapedChar / [^\[\]])+ { return chars.join('') }


text "Text"
    =	chars:charSequence {
			return { 
				type: 'text', 
				value: chars,
				text: chars,
				render: chars
			}
    	}


_ "Whitespace"
	= [ \t\n\r]*

nl "New Line"
	= [\t\n\r]?

// =========
//   CARGO
// =========


condition "Condition"

	= 	left:operand _ operator:operators _ right:operand {
			debug(':::::::::::::::: LEFT', left)
			debug(':::::::::::::::: OPERATOR', operator)
			debug(':::::::::::::::: RIGHT', right)
			let value = _evaluateCondition({left, operator, right}, payload)
			return { type: "condition", value: value }
		}

	/ neg:"!" op:operand _ {
		op.neg = true
//		if(op.type !== 'boolean'){ op.value = _getValueFromPath(op.value, payload) }
		op.value = !op.value
		op.type = 'condition'
		return op
	}

logicalOrExpression
		= left:logicalAndExpression _ "||" _ right:logicalOrExpression {
			return { type: "condition", value: left.value || right.value };
		}
		/ logicalAndExpression
	
logicalAndExpression
	= left:logicalTerm _ "&&" _ right:logicalAndExpression {
		return { type: "condition", value: left.value && right.value };
	}
	/ logicalTerm

logicalTerm
	= parenExpr
	/ condition
	/ operand

parenExpr
	= "(" _ expr:logicalOrExpression _ ")" { return expr; }

operators "Operators"
	= 	'===' / '==' / '!==' / '!=' / '<=' / '>=' / '<' / '>'


operand "Operand"
	=	quotedText
	/	boolean
	/	number
	/	objectField
	/	name


name "Name"
	=	name:$([a-zA-Z0-9'.]+) {return { type: "name", value: name}}


// assignment "Assignment"
// 	= 	name:operand _ "=" _ value:operand {
// 			return { type: "assignment", name, value }
// 		}

nullLiteral
    =	"null" { return { type: 'null', value: null } }

undefinedLiteral
    =	"undefined" { return { type: 'undefined', value: undefined } }

// USING
usingPattern "Using"
	=	name:(quotedText / name) _ "using" _ value:operand {
			return {
				type: "using", 
				name: name.value,
				value: _getValueFromPath(value.value, payload) || value.value
			}
		}

/*
byPattern
	=	list:operand _ "by" _ key:operand {
			return {
				type: 'groupBy',
				//name: list.value,
				//key: key.value
				name: key.value,
				key: list.value
			}
		}
*/		
		
// ATTRIBUTES
// USE SAME AS NAME IN USING FOR KEY???????????
attribute
	= 	key:attrKey _ "=" _ value:(objectField / quotedText / text) {
			return { type: "attribute", key, value: value.value }
		}
	/   prefixPattern

prefixPattern
	=   prefix:("." / "#" / "-") name:attrKey {
			let type;
			switch (prefix) {
				case ".": type = "classes"; break;
				case "#": type = "id"; break;
				case "-": type = "flag"; break;
			}
			return { type, value: name }
		}

attrKey
	=	$([a-zA-Z0-9-_.]+)

/*
// CLASSES
classPattern
	=	"." className:attrKey {
		return { type: "classes", value: className }
	}

// ID
idPattern
	=	"#" idName:attrKey {
			return { type: "id", value: idName }
		}

// FLAG
flag
	=	"-" flag:attrKey {
			return { type: "flag", value: flag }
		}
*/

// OTHER
otherValue
	=	other:($("'" [^']* "'") / $("\"" [^"]* "\"") / $([^\s,]+)) { 
			return { type: "otherValue", value: other }
		}

// IF › ElseIfBranch
ElseIfBranch
  = "[else:" _ cond:ifArguments _ "]" nl
	body:
	  ( !("[else:" / "[else]" / "[/if]") expr:expression { return expr; } )*
	{
	  return { params: cond, condition: cond, content: body };
	}

// IF › ElseBranch
ElseBranch
	=	"[else]" _ body:( !("[else:" / "[else:" / "[/if]") expr:expression { return expr; } )*
		{		
			return { content: body };
		}
