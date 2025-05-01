import aggregators from '$lib/aggregators.svelte.js';

class Validation {
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
}

export default Validation;
