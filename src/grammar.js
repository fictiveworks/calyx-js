import Registry from "./registry"

class Grammar {
  constructor(registry) {
    this.registry = registry
  }

  generate() {
    this.registry.evaluate()
  }
}

const grammar = (rules) => {
  const registry = new Registry(rules)

  const instance = (_rules) => {
    return grammar(Object.assign(rules, _rules))
  }

  instance.generate = (context={}) => {
    console.log(Object.assign(rules, context))
  }

  return instance
}

export default grammar
