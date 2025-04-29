class Aggregator {
  #part;
  #parentId;

  constructor (part, parentId) {
    this.#part = part;
    this.#parentId = parentId;
  }

  get part () {
    return this.#part;
  }

  get parentId () {
    return this.#parentId;
  }

  subjects = $derived([]);

  count = $derived(this.subjects.length);

  points = $derived(this.subjects.reduce((pointTotal, { points }) => pointTotal += points, 0));
}

export default Aggregator;
