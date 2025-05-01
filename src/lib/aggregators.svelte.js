import armyList from '$lib/army-list.svelte.js';
import FormationTypeAggregator from '$lib/aggregators/formation-type-aggregator.svelte.js';
import FormationAggregator from '$lib/aggregators/formation-aggregator.svelte.js';
import UpgradeAggregator from '$lib/aggregators/upgrade-aggregator.svelte.js';

class Aggregators {
  #formationTypeAggregators = $derived.by(() => {
    const formationTypeAggregators = {};

    for (const name of armyList.formationTypes) {
      formationTypeAggregators[name] = new FormationTypeAggregator(armyList.formationType(name));
    }

    return formationTypeAggregators;
  });

  #formationAggregators = $derived.by(() => {
    const formationAggregators = {};

    for (const name of armyList.formations) {
      formationAggregators[name] = new FormationAggregator(armyList.formation(name));
    }

    return formationAggregators;
  });

  #upgradeAggregators = $derived.by(() => {
    const upgradeAggregators = {};

    for (const name of armyList.upgrades) {
      upgradeAggregators[name] = new UpgradeAggregator(armyList.upgrade(name));
    }

    return upgradeAggregators;
  });

  for (part) {
    if (part.type === 'formationType') return this.forFormationType(part.name);
    if (part.type === 'formation') return this.forFormation(part.name);
    if (part.type === 'upgrade') return this.forUpgrade(part.name);
  }

  forFormationType (formationTypeName) {
    return this.#formationTypeAggregators[formationTypeName];
  }

  forFormation (formationName) {
    return this.#formationAggregators[formationName];
  }

  forUpgrade (upgradeName) {
    return this.#upgradeAggregators[upgradeName];
  }
}

const aggregators = new Aggregators();

export default aggregators;
