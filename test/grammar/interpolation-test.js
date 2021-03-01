import test from 'ava'
import grammar from '../../src/grammar.js'

test('substitute multiple rules in a string', t => {
  const g = grammar({
    start: '{one}. {two}.',
    one: 'One',
    two: 'Two'
  })

  t.is(g.generate().text, 'One. Two.')
})

test('calls formatting function in a substitution', t => {
  const g = grammar({
    start: '{hello_world}.',
    hello_world: '{hello.toUpperCase} world',
    hello: 'hello'
  })

  t.is(g.generate().text, 'HELLO world.')
})

test('calls chained formatting functions in a substitution', t => {
  const g = grammar({
    start: '{hello_world}.',
    hello_world: '{hello.toUpperCase.trim}',
    hello: 'hello world     '
  })

  t.is(g.generate().text, 'HELLO WORLD.')
})
