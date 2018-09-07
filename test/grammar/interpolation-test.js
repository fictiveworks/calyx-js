import test from 'ava'
import calyx from '../../src/calyx'

test('substitute multiple rules in a string', t => {
  const grammar = calyx.grammar({
    start: '{one}. {two}.',
    one: 'One',
    two: 'Two'
  })

  t.is(grammar.generate().text, 'One. Two.')
})
