import Rule from './rule'

class Registry {
  constructor(rules={}) {
    this.rules = {}

    for (const key in rules) {
      this.rules[key] = new Rule(key, rules[key])
    }
  }

  combine(registry) {
    this.rules = Object.assign(this.rules, registry.rules)
  }

  expand(symbol) {
    const expansion = this.rules[symbol]

    if (!expansion) throw new Error(`UndefinedRule: ${symbol}`)

    return expansion
  }

  evaluate(startSymbol="start") {
    return [startSymbol, this.expand(startSymbol).evaluate()]
  }
}

export default Registry
