import force from '$lib/force.svelte.js';
import Aggregator from '$lib/classes/aggregators/aggregator.svelte.js';

class FormationAggregator extends Aggregator {
  #name;

  constructor (name) {
    super();
    this.#name = name;
  }

  subjects = $derived(force.formations.filter(({ name }) => this.#name === name));
}

export default FormationAggregator;
