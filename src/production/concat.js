import nonTerminal from "./non-terminal.js";
import terminal from "./terminal.js";
import expression from "./expression.js";
import memo from "./memo.js";
import unique from "./unique.js";

class Concat {
  constructor(expansion, registry) {
    this.expansion = expansion;
    this.registry = registry;
  }

  evaluate(options) {
    this.registry.pushBranch();
    const concat = this.expansion.reduce((accumulator, production) => {
      accumulator.push(production.evaluate(options));
      return accumulator;
    }, []);
    this.registry.popBranch();

    return [Symbol.for("concat"), concat];
  }
}

const EXPRESSION_PATTERN = /(\{[A-Za-z0-9_@$\.]+\})/;
const START_TOKEN = "{";
const END_TOKEN = "}";
const DEREF_TOKEN = ".";
const MEMO_SIGIL = "@";
const UNIQUE_SIGIL = "$";

function concat(production, registry) {
  const expansion = production.split(EXPRESSION_PATTERN).map((fragment) => {
    if (
      fragment[0] == START_TOKEN &&
      fragment[fragment.length - 1] == END_TOKEN
    ) {
      const expr = fragment.slice(1, fragment.length - 1).split(DEREF_TOKEN);
      let rule;

      if (expr[0][0] == MEMO_SIGIL) {
        if (expr[0][1] == MEMO_SIGIL) {
          rule = memo(expr[0].slice(2, fragment.length - 1), true, registry);
        } else {
          rule = memo(expr[0].slice(1, fragment.length - 1), false, registry);
        }
      } else if (expr[0][0] == UNIQUE_SIGIL) {
        rule = unique(expr[0].slice(1, fragment.length - 1), registry);
      } else {
        rule = nonTerminal(expr[0], registry);
      }

      if (expr.length > 1) {
        return expression(rule, expr, registry);
      } else {
        return rule;
      }
    } else {
      return terminal(fragment);
    }
  });

  return new Concat(expansion, registry);
}

export default concat;
