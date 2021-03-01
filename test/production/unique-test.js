import test from 'ava'
import Registry from '../../src/registry.js'
import unique from '../../src/production/unique.js'

test('unique results never repeat in a sequence', t => {
  const production = unique("cycle", new Registry({cycle: ['a','b','c']}))

  const a = production.evaluate()
  const b = production.evaluate()
  const c = production.evaluate()

  const result = [a[1][1][1][0][1], b[1][1][1][0][1], c[1][1][1][0][1]].join("")
  t.regex(result, /abc|acb|bac|bca|cab|cba/)
})

test('unique results cycle when sequence is longer than number of choices', t => {
  const production = unique("cycle", new Registry({cycle: ['a','b']}))

  const a = production.evaluate()
  const b = production.evaluate()
  const c = production.evaluate()

  const result = [a[1][1][1][0][1], b[1][1][1][0][1], c[1][1][1][0][1]].join("")
  t.regex(result, /aba|abb|baa|bab/)
})
