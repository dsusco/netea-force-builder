class Validation {
  #aggregator;

  constructor (validation, aggregator) {console.log(validation, aggregator)
    this.#aggregator = aggregator;
  }

  aggregator = $derived(this.#aggregator);
}

export default Validation;
