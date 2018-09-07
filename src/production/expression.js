import { flattenTree } from "../utils"

class Expression {
  constructor(production, funcs, registry) {
    this.production = production
    this.funcs = funcs
    this.registry = registry
  }

  evaluate() {
    const expansion = flattenTree(this.production.evaluate()).join('')
    const result = this.funcs.reduce((value, func) => this.registry.transform(func, value), expansion)
    return [Symbol.for("expression"), result]
  }
}

function expression(production, funcs, registry) {
  return new Expression(production, funcs, registry)
}

export default expression
