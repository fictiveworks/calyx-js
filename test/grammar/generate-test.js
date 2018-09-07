import test from 'ava'
import calyx from '../../src/calyx'

const grammar = calyx.grammar({
  alt_start: 'alt_start',
  start: 'start'
})

test('generate with default start symbol', t => {
  t.is(grammar.generate().text, 'start')
});

test('generate with specified start symbol', t => {
  t.is(grammar.generate('alt_start').text, 'alt_start')
});
