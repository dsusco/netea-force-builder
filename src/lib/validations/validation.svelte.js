import aggregators from '$lib/aggregators.svelte.js';

class Validation {
  #part;

  constructor (validation, part) {
    this.#part = part;
  }

  aggregator = $derived(aggregators.for(this.#part));
}

export default Validation;
