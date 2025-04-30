import force from '$lib/force.svelte.js';
import Aggregator from '$lib/aggregators/aggregator.svelte.js';

class UpgradeAggregator extends Aggregator {
  constructor (part) {
    super(part);
  }

  subjects = $derived(force.formations
                        .map(({ upgrades}) => upgrades.filter(({ name }) => this.part.name === name))
                          .flat());
}

export default UpgradeAggregator;
