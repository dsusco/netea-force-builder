class Validation {
<<<<<<< HEAD
  static ONS = ['points', 'count', 'formations', 'upgrades'];

  #on;
  #value;
  #part;

  constructor (validation, part) {
    this.#on = validation.on;
    this.#value = validation.value;
    this.#part = part;
  }

  aggregator = $derived(aggregators.for(this.#part));

  get on () {
    return this.constructor.ONS.find((on) => this.#on === on) || this.constructor.ONS[0];
  }

  get value () {
    let value = this.#value;

    if (typeof value === 'string') {
      value = value.split('/');
      value = +value[0] / (+value[1] || 1);
    }

    return +value;
  }
=======
  #aggregator;

  constructor (validation, aggregator) {console.log(validation, aggregator)
    this.#aggregator = aggregator;
  }

  aggregator = $derived(this.#aggregator);
>>>>>>> 7d82c859ff10d2466b4d14bef93a3cf3fd4586b8
}

export default Validation;
