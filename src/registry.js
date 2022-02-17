import rule from "./rule.js";
import Options from "./options.js";

class Registry {
  constructor(options = {}, rules = {}) {
    this.options = Object.assign(Options, options);
    this.rules = {};
    this.memos = {};
    this.uniques = {};
    this.context = {};

    for (const key in rules) {
      this.rules[key] = rule(key, rules[key], this);
    }
  }

  reset() {
    this.memos = {};
    this.uniques = {};
    this.context = {};
  }

  combine(registry) {
    this.rules = Object.assign(this.rules, registry.rules);
  }

  transform(name, value) {
    return value[name] ? value[name]() : value;
  }

  expand(symbol) {
    const expansion = this.rules[symbol] || this.context[symbol];

    if (!expansion) throw new Error(`UndefinedRule: ${symbol}`);

    return expansion;
  }

  evaluateMemo(symbol) {
    if (!this.memos[symbol]) {
      this.memos[symbol] = this.expand(symbol).evaluate(this.options);
    }
    return this.memos[symbol];
  }

  evaluateUnique(symbol) {
    let pending = true;
    let result;
    if (!this.uniques[symbol]) this.uniques[symbol] = [];

    while (pending) {
      if (this.uniques[symbol].length == this.rules[symbol].length) {
        this.uniques[symbol] = [];
        pending = false;
      }

      result = this.expand(symbol).evaluate(this.options);

      if (!this.uniques[symbol].includes(JSON.stringify(result))) {
        this.uniques[symbol].push(JSON.stringify(result));
        pending = false;
      }
    }

    return result;
  }

  evaluate(symbol = "start", context = {}) {
    this.reset();

    for (const key in context) {
      if (this.rules[key]) {
        throw new Error(`DuplicateRule: ${key}`);
      }

      this.context[key] = rule(key, context[key], this);
    }

    return [Symbol.for(symbol), this.expand(symbol).evaluate(this.options)];
  }
}

export default Registry;
