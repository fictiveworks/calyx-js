import choice from './production/choice'

function weightedChoices() {
  console.log("construct weighted choices")
}

function parseProductions(productions) {
  if (productions.length == undefined) {
    return weightedChoices(productions)
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
