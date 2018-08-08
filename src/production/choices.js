import concat from './concat'

class Choices {
  constructor(collection) {
    this.collection = collection
  }

  get length() {
    return this.collection.length
  }

  evaluate() {
    const element = this.collection[Math.floor(Math.random() * this.collection.length)];
    return [Symbol.for('choice'), element.evaluate()]
  }
}

function choices(production) {
  const productions = (typeof production == 'string') ? [production] : production

  const choices = productions.map((choice) => {
    if (typeof choice == 'string') {
      return concat(choice)
    }
  })

  return new Choices(choices)
}

export default choices
