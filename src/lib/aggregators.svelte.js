import armyList from '$lib/army-list.svelte.js';
import force from '$lib/force.svelte.js';
import FormationTypeAggregator from '$lib/aggregators/formation-type-aggregator.svelte.js';
import FormationAggregator from '$lib/aggregators/formation-aggregator.svelte.js';
import UpgradeAggregator from '$lib/aggregators/upgrade-aggregator.svelte.js';
import FormationUpgradeAggregator from '$lib/aggregators/formation-upgrade-aggregator.svelte.js';

class Aggregators {
  #formationTypeAggregators = $derived(Object.fromEntries(
    armyList.formationTypes.map((name) => [name, new FormationTypeAggregator(armyList.formationType(name))])));

  #formationAggregators = $derived(Object.fromEntries(
    armyList.formations.map((name) => [name, new FormationAggregator(armyList.formation(name))])));

  #upgradeAggregators = $derived(Object.fromEntries(
    armyList.upgrades.map((name) => [name, new UpgradeAggregator(armyList.upgrade(name))])));

  #formationUpgradeAggregators = $derived(Object.fromEntries(
    force.formations.map(({ id, allowedUpgrades }) =>
      [ id,
        Object.fromEntries(allowedUpgrades.map((name) => [name, new FormationUpgradeAggregator(armyList.upgrade(name), id)])) ])));;

  forFormationType (formationTypeName) {
    return this.#formationTypeAggregators[formationTypeName];
  }

  forFormation (formationName) {
    return this.#formationAggregators[formationName];
  }

  forUpgrade (upgradeName) {
    return this.#upgradeAggregators[upgradeName];
  }

  forFormationUpgrade (formationId, upgradeName) {
    return this.#formationUpgradeAggregators[formationId][upgradeName];
  }
}

const aggregators = new Aggregators();

export default aggregators;
