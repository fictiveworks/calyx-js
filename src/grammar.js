import Registry from "./registry"
import result from "./result"

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
    return result(registry.evaluate())
  }

  return instance
}

export default grammar
