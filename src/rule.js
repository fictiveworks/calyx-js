import choice from './production/choice'
import weightedChoice from './production/weighted-choice'

function parseProductions(productions) {
  if (productions.length == undefined) {
    return weightedChoice(productions)
  } else {
    return choice(productions)
  }
}

class Rule {
  constructor(name, productions) {
    this.name = name
    this.productions = parseProductions(productions)
  }

  evaluate() {
    return this.productions.evaluate()
  }
}

export default Rule
