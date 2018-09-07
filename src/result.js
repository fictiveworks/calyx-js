import { flattenTree } from "./utils"

class Result {
  constructor(expression) {
    this.expression = Object.freeze(expression)
  }

  get tree() {
    return this.expression
  }

  get text() {
    return flattenTree(this.expression).join('')
  }
}

function result(expression) {
  return new Result(expression)
}

export default result
