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

test('calls formatting function in a substitution', t => {
  const grammar = calyx.grammar({
    start: '{hello_world}.',
    hello_world: '{hello.toUpperCase} world',
    hello: 'hello'
  })

  t.is(grammar.generate().text, 'HELLO world.')
})

test('calls chained formatting functions in a substitution', t => {
  const grammar = calyx.grammar({
    start: '{hello_world}.',
    hello_world: '{hello.toUpperCase.trim}',
    hello: 'hello world     '
  })

  t.is(grammar.generate().text, 'HELLO WORLD.')
})
