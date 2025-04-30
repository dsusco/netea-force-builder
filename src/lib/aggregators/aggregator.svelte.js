class Aggregator {
  #part;

  constructor (part) {
    this.#part = part;
  }

  get part () {
    return this.#part;
  }

  subjects = $derived([]);

  count = $derived(this.subjects.length);

  points = $derived(this.subjects.reduce((pointTotal, { points }) => pointTotal += points, 0));
}

export default Aggregator;
