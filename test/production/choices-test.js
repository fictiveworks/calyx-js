import test from 'ava'
import choice from '../../src/production/choice'

// TODO: result tree for this use case is undefined in the Ruby implementation
// test('construct choices from single atom', t => {
// 	const production = choice('atom')
//
// 	t.deepEqual(production.evaluate(), ['choice', ['concat', [['atom', 'atom']]]])
// })

test('construct choices from list of atoms', t => {
	const production = choice(['atom', 'atom', 'atom'])

	t.deepEqual(production.evaluate(), ['choice', ['concat', [['atom', 'atom']]]])
})
