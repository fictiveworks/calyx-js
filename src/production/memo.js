class Memo {
  constructor(symbol, registry) {
    this.symbol = symbol
    this.registry = registry
  }

  evaluate() {
    return [Symbol.for(this.symbol), this.registry.evaluateMemo(this.symbol)]
  }
}

function memo(symbol, registry) {
  return new Memo(symbol, registry)
}

export default memo
