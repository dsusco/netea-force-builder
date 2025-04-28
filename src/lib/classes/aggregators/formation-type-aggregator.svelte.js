import force from '$lib/force.svelte.js';
import Aggregator from '$lib/classes/aggregators/aggregator.svelte.js';

class FormationTypeAggregator extends Aggregator {
  #name;

  constructor (name) {
    super();
    this.#name = name;
  }

  subjects = $derived(force.formations.filter(({ type }) => this.#name === type));
}

export default FormationTypeAggregator;
