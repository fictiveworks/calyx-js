import test from 'ava'
import calyx from '../../src/calyx'

test.skip('generate with explicit start symbol', t => {
  const grammar = calyx.grammar({
    alt_start: 'alt_start',
    start: 'start'
  })

  t.is(grammar.generate('alt_start'), 'alt_start')
});
