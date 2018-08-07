const flattenTree = tree => tree.reduce(
  (list, node) => list.concat(Array.isArray(node) ? flattenTree(node) : node),
  []
);

const discardSymbols = entry => typeof entry != "symbol"

class Result {
  constructor(expression) {
    this.expression = Object.freeze(expression)
  }

  get tree() {
    return this.expression
  }

  get text() {
    return flattenTree(this.expression).filter(discardSymbols).join('')
  }
}

function result(expression) {
  return new Result(expression)
}

export default result
