class NonTerminal {
  constructor(symbol, registry) {
    this.symbol = symbol;
    this.registry = registry;
  }

  evaluate(options) {
    return [
      Symbol.for(this.symbol),
      this.registry.expand(this.symbol).evaluate(options),
    ];
  }
}

function nonTerminal(symbol, registry) {
  return new NonTerminal(symbol, registry);
}

export default nonTerminal;
