import test from 'ava'
import grammar from '../src/grammar'

test('grammar with start rule', t => {
  const g = grammar({start: "Hello."})
  t.is(g.generate().text, "Hello.")
})
