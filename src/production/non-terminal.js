class NonTerminal {
  constructor(symbol, registry) {
    this.symbol = symbol
    this.registry = registry
  }

  evaluate() {
    return [this.symbol, this.registry.expand(this.symbol).evaluate()]
  }
}

function nonTerminal(symbol, registry) {
  return new NonTerminal(symbol, registry)
}

export default nonTerminal
