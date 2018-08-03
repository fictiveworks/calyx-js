import nonTerminal from './non-terminal'
import terminal from './terminal'

class Concat {
  constructor(expansion) {
    this.expansion = expansion
  }

  evaluate() {
    const concat = this.expansion.reduce((accumulator, production) => {
      accumulator.push(production.evaluate())
      return accumulator
    }, [])

    return ['concat', concat]
  }
}

const EXPRESSION_PATTERN = /(\{[A-Za-z0-9_@$\.]+\})/
const START_TOKEN = '{'
const END_TOKEN = '}'
const DEREF_TOKEN = '.'

function concat(production, registry) {
  const expansion = production.split(EXPRESSION_PATTERN).map((fragment) => {
    if (fragment[0] == START_TOKEN && fragment[fragment.length-1] == END_TOKEN) {
      return nonTerminal(fragment.slice(1, fragment.length-1), registry)
    } else {
      return terminal(fragment)
    }
  })

  return new Concat(expansion)
}



export default concat
