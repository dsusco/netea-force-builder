import force from '$lib/force.svelte.js';
import Aggregator from '$lib/classes/aggregators/aggregator.svelte.js';

class FormationTypeAggregator extends Aggregator {
  #formationType;

  constructor (formationType) {
    super();
    this.#formationType = formationType;
  }

  subjects = $derived(force.formations.filter(({ type }) => this.#formationType === type));
}

export default FormationTypeAggregator;
