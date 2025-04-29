import force from '$lib/force.svelte.js';
import Aggregator from '$lib/aggregators/aggregator.svelte.js';

class FormationTypeAggregator extends Aggregator {
  constructor (part) {
    super(part);
  }

  subjects = $derived(force.formations.filter(({ formationType }) => this.part.name === formationType));
}

export default FormationTypeAggregator;
