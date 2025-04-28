import force from '$lib/force.svelte.js';
import Aggregator from '$lib/classes/aggregators/aggregator.svelte.js';

class UpgradeAggregator extends Aggregator {
  #upgradeName;

  constructor (upgradeName) {
    super();
    this.#upgradeName = upgradeName;
  }

  subjects = $derived.by(() => {
    const subjects = [];

    for (const { upgrades } of force.formations) {
      subjects.push(...upgrades.filter(({ name }) => this.#upgradeName === name));
    }

    return subjects;
  });
}

export default UpgradeAggregator;
