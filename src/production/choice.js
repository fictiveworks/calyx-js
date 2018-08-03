import concat from './concat'

class Choice {
  constructor(collection) {
    this.collection = collection
  }

  evaluate() {
    const element = this.collection[Math.floor(Math.random() * this.collection.length)];
    return ['choice', element.evaluate()]
  }
}

function choice(production) {
  const productions = (typeof production == 'string') ? [production] : production

  const choices = productions.map((choice) => {
    if (typeof choice == 'string') {
      return concat(choice)
    }
  })

  return new Choice(choices)
}

export default choice
