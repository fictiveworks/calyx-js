class Unique {
  constructor(symbol, registry) {
    this.symbol = symbol
    this.registry = registry
  }

  evaluate() {
    return [Symbol.for(this.symbol), this.registry.evaluateUnique(this.symbol)]
  }
}

function unique(symbol, registry) {
  return new Unique(symbol, registry)
}

export default unique
