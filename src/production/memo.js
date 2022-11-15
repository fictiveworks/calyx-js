class Memo {
  constructor(symbol, isBranchScoped, registry) {
    this.symbol = symbol;
    this.registry = registry;
    this.isBranchScoped = isBranchScoped;
  }

  evaluate(options) {
    if (this.isBranchScoped) {
      this.registry.setBranchScopedMemo();
    }
    return [Symbol.for(this.symbol), this.registry.evaluateMemo(this.symbol)];
  }
}

function memo(symbol, isBranchScoped, registry) {
  return new Memo(symbol, isBranchScoped, registry);
}

export default memo;
