import test from 'ava'
import Registry from '../../src/registry'
import concat from '../../src/production/concat'

test('treats input with no delimiters as a concatenated production with a single atom', t => {
	const production = concat('one two three', new Registry())

  t.deepEqual(production.evaluate(), ['concat', [['atom', 'one two three']]])
})

test('treats input with delimiters as a concatenated production with an expansion', t => {
  const production = concat('{one} two three', new Registry({one: 'ONE'}))

  t.deepEqual(production.evaluate(), ['concat', [['atom', ''], ['one', ['choice', ['concat', [['atom', 'ONE']]]]], ['atom', ' two three']]])
})
