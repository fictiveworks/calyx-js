import test from 'ava'
import calyx from '../../src/calyx'

test('context with values', t => {
  const grammar = calyx.grammar({
    start: '{one}{two}{three}'
  })

  t.is(grammar.generate({one: '1', two: '2', three: '3'}).text, '123')
});

test('context with expansions', t => {
  const grammar = calyx.grammar({
    start: '{how}',
    a: 'piece of string?'
  })

  t.is(grammar.generate({how: '{long}', long: '{is}', is: '{a}'}).text, 'piece of string?')
});

test('context with choices', t => {
  const grammar = calyx.grammar({
    start: '{fruit}'
  })

  t.regex(grammar.generate({fruit: ['apple', 'orange']}).text, /apple|orange/)
})

test('context with duplicate rule', t => {
  const grammar = calyx.grammar({
    start: '{priority}',
    priority: '(A)'
  })

  t.throws(() => grammar.generate({priority: '(B)'}))
})
