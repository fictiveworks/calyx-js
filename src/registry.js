import Rule from './rule'

class Registry {
  constructor(rules={}) {
    this.rules = {}
    this.memos = {}

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

  expandUnique(symbol) {

  }

  evaluate(startSymbol="start") {
    return [Symbol.for(startSymbol), this.expand(startSymbol).evaluate()]
  }
}

export default Registry
