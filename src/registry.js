import Rule from './rule'

class Registry {
  constructor(rules={}) {
    this.rules = {}
    this.memos = {}
    this.uniques = {}

    for (const key in rules) {
      this.rules[key] = new Rule(key, rules[key])
    }
  }

  combine(registry) {
    this.rules = Object.assign(this.rules, registry.rules)
  }

  transform(name, value) {
    return (value[name]) ? value[name]() : value
  }

  expand(symbol) {
    const expansion = this.rules[symbol]

    if (!expansion) throw new Error(`UndefinedRule: ${symbol}`)

    return expansion
  }

  evaluateMemo(symbol) {
    if (!this.memos[symbol]) this.memos[symbol] = this.expand(symbol).evaluate()
    return this.memos[symbol]
  }

  evaluateUnique(symbol) {
    let pending = true
    let result
    if (!this.uniques[symbol]) this.uniques[symbol] = []

    while (pending) {
      if (this.uniques[symbol].length == this.rules[symbol].length) {
        this.uniques[symbol] = []
        pending = false
      }

      result = this.expand(symbol).evaluate()

      if (!this.uniques[symbol].includes(JSON.stringify(result))) {
        this.uniques[symbol].push(JSON.stringify(result))
        pending = false
      }
    }

    return result
  }

  evaluate(startSymbol="start") {
    return [Symbol.for(startSymbol), this.expand(startSymbol).evaluate()]
  }
}

export default Registry
