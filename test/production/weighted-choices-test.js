import test from 'ava'
import weightedChoices from '../../src/production/weighted-choices'

const rng = () => 0.1

test('selects rules with a weighted choice', t => {
  const production = weightedChoices({'20%': 0.2, '80%': 0.8}, rng)

	t.deepEqual(production.evaluate(), [Symbol.for('weighted_choice'), [Symbol.for('concat'), [[Symbol.for('atom'), '80%']]]])
})

test('raises error if weighted choices do not sum to 1', t => {
  const production = () => weightedChoices({'10%': 0.1, '70%': 0.7}, rng)

	t.throws(production, Error, 'Weights must sum to 1')
})

test('selects rules with integer weights', t => {
  const production = weightedChoices({'20%': 20, '80%': 80}, rng)

	t.deepEqual(production.evaluate(), [Symbol.for('weighted_choice'), [Symbol.for('concat'), [[Symbol.for('atom'), '80%']]]])
})
