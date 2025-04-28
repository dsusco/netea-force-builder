import force from '$lib/force.svelte.js';
import Aggregator from '$lib/classes/aggregators/aggregator.svelte.js';

class FormationAggregator extends Aggregator {
  #formationName;

  constructor (formationName) {
    super();
    this.#formationName = formationName;
  }

  subjects = $derived(force.formations.filter(({ name }) => this.#formationName === name));
}

export default FormationAggregator;
