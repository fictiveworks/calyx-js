import concat from "./concat.js";

class WeightedChoices {
  constructor(productions, weights) {
    this.productions = productions;
    this.weights = weights;
  }

  get length() {
    return this.productions.length;
  }

  evaluate(options) {
    let maxIndex = 0;
    let maxWeight = 0;
    let maxRoll = 0;

    for (let i = 0; i < this.weights.length; i++) {
      let currentWeight = this.weights[i];
      let currentRoll = Math.pow(options.rng(), 1.0 / currentWeight);

      if (currentRoll > maxRoll) {
        maxRoll = currentRoll;
        maxWeight = currentWeight;
        maxIndex = i;
      }
    }

    return [
      Symbol.for("weighted_choice"),
      this.productions[maxIndex].evaluate(options),
    ];
  }
}

function weightedChoices(rules, registry) {
  const productions = Object.keys(rules).map((rule) => {
    return concat(rule, registry);
  });

  const weights = Object.values(rules);
  const weightsTotal = weights.reduce((a, b) => a + b);

  let normalizedWeights;

  if (Number.isInteger(weights[0])) {
    normalizedWeights = weights.map((weight) => (weight / weightsTotal) * 1.0);
  } else {
    if (weightsTotal != 1) throw Error("Weights must sum to 1");
    normalizedWeights = weights;
  }

  return new WeightedChoices(productions, normalizedWeights);
}

export default weightedChoices;
