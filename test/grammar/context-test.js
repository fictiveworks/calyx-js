import test from 'ava'
import calyx from '../../src/calyx'

test('construct dynamic rules with context values', t => {
  const grammar = calyx.grammar({
    start: '{one}{two}{three}'
  })

  t.is(grammar.generate({one: '1', two: '2', three: '3'}).text, '123')
});
