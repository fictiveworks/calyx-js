import test from 'ava'
import calyx from '../src/calyx.js'

test('grammar with start rule', t => {
  const g = calyx.grammar({start: "Hello."})
  t.is(g.generate().text, "Hello.")
})
