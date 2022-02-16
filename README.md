# Calyx

A JavaScript port of [Calyx](https://github.com/maetl/calyx), a Ruby based generative grammar tool.

## Status

[![npm](https://img.shields.io/npm/v/calyx.svg)](https://npmjs.org/package/calyx)
[![github](https://img.shields.io/github/workflow/status/fictiveworks/calyx/Node.js%20CI)](https://github.com/fictiveworks/calyx/actions)

## Install

```
npm install calyx
```

## Usage

Most of the existing documentation is for the Ruby version, but some brief usage notes are included below.

### ESM

```js
import calyx from "calyx"

const hello = calyx.grammar({
  "start": "Hello world."
})
```

### CommonJS

```js
const calyx = require("calyx")

const hello = calyx.grammar({
  "start": "Hello world."
})
```

## Generator API

Call `generate` on a grammar instance to generate a random text based on your configured rules.

```js
const result = hello.generate()
```

`generate` returns a `Result` type which allows you to access the generated text as a string or an s-expression tree of arrays.

```js
result.text
result.tree
```

## Example Usage

Every grammar feature documented for the [Ruby version](https://github.com/maetl/calyx) should work here (if not, please raise a bug report).

The main difference between the Ruby and JavaScript implementations is the class-based Ruby DSL for defining grammar rules. This doesn’t exist in the JavaScript version which only supports definitions in the object-literal format with string keys for rule names.

```js
import { grammar } from "calyx"

const companyNames = grammar({
  "start": ["{web_two_punkt_oh} {ext}", "{acme_variations} {ext}"],
  "ext": ["LLC", "Ltd", "Limited", "Pty Ltd"],
  "web_two_punkt_oh": ["{punktrs}r", "{punktrs}zy"],
  "punktrs": ["Lick", "Stick", "Brick", "Syntax", "Relax", "Back"],
  "acme_variations": "Acme {acme_noun}",
  "acme_noun": ["Products", "Industries", "Goods", "Holdings", "Services"]
})

const company = companyNames.generate()

console.log(company.text)
```

## Syntax

[See more details here](https://github.com/maetl/calyx/blob/master/SYNTAX.md).

## License

This package is copyright 2017-2022 Mark Rickerby and distributed freely under the terms of the MIT License. See the LICENSE file packaged with this software distribution.
