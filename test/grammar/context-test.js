import test from 'ava'
import grammar from '../../src/grammar.js'

test('context with values', t => {
  const g = grammar({
    start: '{one}{two}{three}'
  })

  t.is(g.generate({one: '1', two: '2', three: '3'}).text, '123')
});

test('context with expansions', t => {
  const g = grammar({
    start: '{how}',
    a: 'piece of string?'
  })

  t.is(g.generate({how: '{long}', long: '{is}', is: '{a}'}).text, 'piece of string?')
});

test('context with choices', t => {
  const g = grammar({
    start: '{fruit}'
  })

  t.regex(g.generate({fruit: ['apple', 'orange']}).text, /apple|orange/)
})

test('context with duplicate rule', t => {
  const g = grammar({
    start: '{priority}',
    priority: '(A)'
  })

  t.throws(() => g.generate({priority: '(B)'}))
})
