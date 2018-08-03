import test from 'ava'
import Registry from '../src/registry'

test('registry evaluates the start rule', t => {
	const registry = new Registry({start: 'atom'})

	t.deepEqual(registry.evaluate(), ['start', ['choice', ['concat', [['atom', 'atom']]]]])
})
