import choices from './production/choices'
import weightedChoices from './production/weighted-choices'

function parseProduction(production) {
  if (production.length == undefined) {
    return weightedChoices(production)
  } else {
    return choices(production)
  }
}

class Rule {
  constructor(name, production) {
    this.name = name
    this.production = parseProduction(production)
  }

  get length() {
    return this.production.length
  }

  evaluate() {
    return this.production.evaluate()
  }
}

export default Rule
