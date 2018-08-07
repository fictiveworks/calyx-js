import test from 'ava'
import weightedChoice from '../../src/production/weighted-choice'

const rng = () => 0.1

test('selects rules with a weighted choice', t => {
  const production = weightedChoice({'20%': 0.2, '80%': 0.8}, rng)

	t.deepEqual(production.evaluate(), ['weighted_choice', ['concat', [['atom', '80%']]]])
})

test('raises error if weighted choices do not sum to 1', t => {
  const production = () => weightedChoice({'10%': 0.1, '70%': 0.7}, rng)

	t.throws(production, Error, 'Weights must sum to 1')
})

test('selects rules with integer weights', t => {
  const production = weightedChoice({'20%': 20, '80%': 80}, rng)

	t.deepEqual(production.evaluate(), ['weighted_choice', ['concat', [['atom', '80%']]]])
})
