import { flattenTree } from "../utils.js"

class Expression {
  constructor(production, funcs, registry) {
    this.production = production
    this.funcs = funcs
    this.registry = registry
  }

  evaluate(options) {
    const expansion = flattenTree(this.production.evaluate(options)).join('')
    const result = this.funcs.reduce((value, func) => this.registry.transform(func, value), expansion)
    return [Symbol.for("expression"), result]
  }
}

function expression(production, funcs, registry) {
  return new Expression(production, funcs, registry)
}

export default expression
