import test from 'ava'
import calyx from '../../src/calyx'

test('generate with default start symbol', t => {
  const grammar = calyx.grammar({
    start: 'start'
  })

  t.is(grammar.generate().text, 'start')
})

test('generate with specified start symbol', t => {
  const grammar = calyx.grammar({
    alt_start: 'alt_start'
  })

  t.is(grammar.generate('alt_start').text, 'alt_start')
})

test('generate with context', t => {
  const grammar = calyx.grammar({
    start: '{hello}'
  })

  t.is(grammar.generate({hello: 'Hello!'}).text, 'Hello!')
})

test('generate with symbol and context', t => {
  const grammar = calyx.grammar({
    alt_start: '{hello}'
  })

  t.is(grammar.generate('alt_start', {hello: 'Hello!'}).text, 'Hello!')
})

test('generate with symbol and context args flipped', t => {
  const grammar = calyx.grammar({
    alt_start: '{hello}'
  })

  t.is(grammar.generate({hello: 'Hello!'}, 'alt_start').text, 'Hello!')
})
