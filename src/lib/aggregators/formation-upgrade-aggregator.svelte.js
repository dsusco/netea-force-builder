import force from '$lib/force.svelte.js';
import Aggregator from '$lib/aggregators/aggregator.svelte.js';

class FormationUpgradeAggregator extends Aggregator {
  #formationId;
  #upgradeName;

  constructor (formationId, upgradeName) {
    super();
    this.#formationId = formationId;
    this.#upgradeName = upgradeName;
  }

  subjects = $derived(force.formations.find(({ id }) => this.#formationId === id)
                        .upgrades.filter(({ name }) => this.#upgradeName === name));
}

export default FormationUpgradeAggregator;
