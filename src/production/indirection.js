import { flattenTree } from "../utils.js";

class Indirection {
  constructor(symbol, registry) {
    this.symbol = symbol;
    this.registry = registry;
  }

  evaluate(options) {
    const greedySymbol = flattenTree(
      this.registry.expand(this.symbol).evaluate(options)
    ).join("");

    return [
      Symbol.for(this.symbol),
      this.registry.expand(greedySymbol).evaluate(options)
    ];
  }
}

function indirection(symbol, registry) {
  return new Indirection(symbol, registry);
}

export default indirection;
