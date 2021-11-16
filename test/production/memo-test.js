import test from 'ava'
import Registry from '../../src/registry.js'
import memo from '../../src/production/memo.js'

// TODO: this can be replaced once the registry supports injectable rng options
const stubRand = () => 0.1
// const nativeRand = Math.random
//
// test.before(t => Math.random = stubRand)
// test.after(t => Math.random = nativeRand)

test('uses the registry to memoize expansions', t => {
  const production = memo("num", new Registry({ rng: stubRand}, {num: ['1','2','3']}))

  t.deepEqual(production.evaluate({ rng: stubRand}), [Symbol.for("num"), [Symbol.for("choice"), [Symbol.for("concat"), [[Symbol.for("atom"), "1"]]]]])
})
