import choices from './production/choices.js'
import weightedChoices from './production/weighted-choices.js'

function rule(name, production, registry) {
  if (production.length == undefined) {
    return new Rule(name, weightedChoices(production, Math.random))
  } else {
    return new Rule(name, choices(production, registry))
  }
}

class Rule {
  constructor(name, production) {
    this.name = name
    this.production = production
  }

  get length() {
    return this.production.length
  }

  evaluate() {
    return this.production.evaluate()
  }
}

export default rule
