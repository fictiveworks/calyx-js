import concat from "./concat.js";

class Choices {
  constructor(collection) {
    this.collection = collection;
  }

  get length() {
    return this.collection.length;
  }

  evaluate(options) {
    const element =
      this.collection[Math.floor(options.rng() * this.collection.length)];

    return [Symbol.for("choice"), element.evaluate(options)];
  }
}

function choices(production, registry) {
  const productions = typeof production == "string" ? [production] : production;

  const choices = productions.map((choice) => {
    if (typeof choice == "string") {
      return concat(choice, registry);
    }
  });

  return new Choices(choices);
}

export default choices;
