import choices from './production/choices'
import weightedChoices from './production/weighted-choices'

function rule(name, production, registry) {
  if (production.length == undefined) {
    return new Rule(name, weightedChoices(production, registry))
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
