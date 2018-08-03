import test from 'ava'
import calyx from '../../dist/calyx.cjs'

test.skip('generate with explicit start symbol', t => {
  const grammar = calyx.grammar({
    alt_start: 'alt_start',
    start: 'start'
  })

  t.is(grammar.generate('alt_start'), 'alt_start')
});
