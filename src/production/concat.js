import nonTerminal from './non-terminal'
import terminal from './terminal'
import expression from './expression'

class Concat {
  constructor(expansion) {
    this.expansion = expansion
  }

  evaluate() {
    const concat = this.expansion.reduce((accumulator, production) => {
      accumulator.push(production.evaluate())
      return accumulator
    }, [])

    return [Symbol.for('concat'), concat]
  }
}

const EXPRESSION_PATTERN = /(\{[A-Za-z0-9_@$\.]+\})/
const START_TOKEN = '{'
const END_TOKEN = '}'
const DEREF_TOKEN = '.'
const MEMO_SIGIL = '@'
const UNIQUE_SIGIL = '$'

function concat(production, registry) {
  const expansion = production.split(EXPRESSION_PATTERN).map((fragment) => {
    if (fragment[0] == START_TOKEN && fragment[fragment.length-1] == END_TOKEN) {
      const expr = fragment.slice(1, fragment.length-1).split(DEREF_TOKEN)
      let rule

      if (expr[0][0] == MEMO_SIGIL) {
        // rule = memo()
      } else if (expr[0][0] == UNIQUE_SIGIL) {
        // rule = unique()
      } else {
        rule = nonTerminal(expr[0], registry)
      }

      if (expr.length > 1) {
        return expression(rule, expr, registry)
      } else {
        return rule
      }

    } else {
      return terminal(fragment)
    }
  })

  return new Concat(expansion)
}



export default concat
