import Registry from "./registry.js"
import result from "./result.js"

const mapDefaultArgs = (args) => {
  let symbol = "start"
  let context = {}

  args.forEach((arg) => {
    if (!arg) return

    if (typeof arg == 'string') {
      symbol = arg
    } else if (Object.getPrototypeOf(arg) === Object.prototype) {
      context = arg
    }
  })

  return {
    symbol,
    context
  }
}

const grammar = (rules) => {
  const registry = new Registry(rules)

  const instance = (_rules) => {
    return grammar(Object.assign(rules, _rules))
  }

  instance.generate = (symbolOpt, contextOpt) => {
    const { symbol, context } = mapDefaultArgs([symbolOpt, contextOpt])
    return result(registry.evaluate(symbol, context))
  }

  return instance
}

grammar.include = mixins => {
  console.log(mixins)
}

export default grammar
