import concat from './concat'

class WeightedChoice {
  constructor(productions, weights, rng) {
    this.productions = productions
    this.weights = weights
    this.rng = rng
  }

  evaluate() {
    let maxIndex = 0
    let maxWeight = 0
    let maxRoll = 0

    for (let i=0; i<this.weights.length; i++) {
      let currentWeight = this.weights[i]
      let currentRoll =  Math.pow(this.rng(), 1.0 / currentWeight)

      if (currentRoll > maxRoll) {
        maxRoll = currentRoll
        maxWeight = currentWeight
        maxIndex = i
      }
    }

    return ["weighted_choice", this.productions[maxIndex].evaluate()]
  }
}

function weightedChoice(rules, rng) {
  const productions = Object.keys(rules).map((rule) => concat(rule))
  const weights = Object.values(rules)
  const weightsTotal = weights.reduce((a,b) => a + b)

  let normalizedWeights

  if (Number.isInteger(weights[0])) {
    normalizedWeights = weights.map((weight) => (weight / weightsTotal * 1.0))
  } else {
    if (weightsTotal != 1) throw Error("Weights must sum to 1")
    normalizedWeights = weights
  }

  return new WeightedChoice(productions, normalizedWeights, rng)
}

export default weightedChoice
