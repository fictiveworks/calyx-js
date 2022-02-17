class Terminal {
  constructor(atom) {
    this.atom = atom;
  }

  evaluate(options) {
    return [Symbol.for("atom"), this.atom];
  }
}

function terminal(production) {
  return new Terminal(production);
}

export default terminal;
