import test from 'ava'
import Registry from '../../src/registry.js'
import expression from '../../src/production/expression.js'
import terminal from '../../src/production/terminal.js'

const atom = terminal('hello')
const registry = new Registry()

test('evaluates a value', t => {
	const production = expression(atom, [], registry)

  t.deepEqual(production.evaluate(), [Symbol.for("expression"), "hello"])
})

test('evaluates a value with modifier', t => {
	const production = expression(atom, ['upper'], registry)

  t.deepEqual(production.evaluate(), [Symbol.for("expression"), "HELLO"])
})

test('evaluates a value with modifier chain', t => {
	const production = expression(atom, ['upper', 'lower'], registry)

  t.deepEqual(production.evaluate(), [Symbol.for("expression"), "hello"])
})
