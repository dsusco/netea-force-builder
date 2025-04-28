class Formation {
  #id;
  #name;
  #cost;

  constructor (formation) {
    this.#id = crypto.randomUUID();
    this.#name = formation.name;
    this.#cost = formation.cost;
  }

  get id () {
    return this.#id;
  }

  get name () {
    return this.#name;
  }

  get cost () {
    return this.#cost;
  }
}

export default Formation;
