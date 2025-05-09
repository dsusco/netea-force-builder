import force from '$lib/force.svelte.js';
import Aggregator from '$lib/aggregators/aggregator.svelte.js';

class FormationUpgradeAggregator extends Aggregator {
  #parentId;

  constructor (part, parentId) {
    super(part);
    this.#parentId = parentId;
  }

  subjects = $derived(force.formations
                        .find(({ id }) => this.#parentId === id)
                          .upgrades.filter(({ name }) => this.part.name === name));
}

export default FormationUpgradeAggregator;
