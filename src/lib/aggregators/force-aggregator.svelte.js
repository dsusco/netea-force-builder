import force from '$lib/force.svelte.js';
import Aggregator from '$lib/aggregators/aggregator.svelte.js';

class ForceAggregator extends Aggregator {
  constructor () {
    super();
  }

  count = undefined;

  formations = $derived(this.subjects.length);

  subjects = $derived(force.formations);
}

export default ForceAggregator;
