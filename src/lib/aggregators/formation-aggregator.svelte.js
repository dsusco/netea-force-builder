import force from '$lib/force.svelte.js';
import Aggregator from '$lib/aggregators/aggregator.svelte.js';

class FormationAggregator extends Aggregator {
  constructor (part) {
    super(part);
  }

  subjects = $derived(force.formations.filter(({ name }) => this.part.name === name));
}

export default FormationAggregator;
