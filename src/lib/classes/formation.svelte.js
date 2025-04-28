class Formation {
  #id;
  #name;
  #cost;
  #type;

  constructor (formation) {
    this.#id = crypto.randomUUID();
    this.#name = formation.name;
    this.#cost = formation.cost;
    this.#type = formation.formationType;
  }

  points = $derived.by(() => {
    let points = +this.cost;

    return points;
  });

  get id () {
    return this.#id;
  }

  get name () {
    return this.#name;
  }

  get cost () {
    return this.#cost;
  }

  get type () {
    return this.#type;
  }
}

export default Formation;
