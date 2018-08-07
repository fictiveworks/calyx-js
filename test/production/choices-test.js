import test from 'ava'
import choices from '../../src/production/choices'

// TODO: result tree for this use case is undefined in the Ruby implementation
// test('construct choices from single atom', t => {
// 	const production = choice('atom')
//
// 	t.deepEqual(production.evaluate(), ['choice', ['concat', [['atom', 'atom']]]])
// })

test('construct choices from list of atoms', t => {
	const production = choices(['atom', 'atom', 'atom'])

	t.deepEqual(production.evaluate(), ['choice', ['concat', [['atom', 'atom']]]])
})
