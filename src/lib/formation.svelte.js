import armyList from '$lib/army-list.svelte.js';
import Upgrade from '$lib/upgrade.svelte.js';
import FormationUpgradeAggregator from '$lib/aggregators/formation-upgrade-aggregator.svelte.js';

class Formation {
  #id;
  #name;
  #allowedUpgrades;
  #cost;
  #validations;
  #formationType;

  constructor (formation) {
    this.#id = crypto.randomUUID();
    this.#name = formation.name;
    this.#allowedUpgrades = formation.upgrades;
    this.#cost = formation.cost;
    this.#validations = formation.validations;
    this.#formationType = formation.formationType;
  }

  upgrades = $state([]);

  upgradeAggregators = $derived.by(() => {
    const upgradeAggregators = {};

    for (const name of this.allowedUpgrades) {
      upgradeAggregators[name] = new FormationUpgradeAggregator(armyList.upgrade(name), this.id);
    }

    return upgradeAggregators;
  });

  upgradeCount = $derived(this.upgrades.length);

  points = $derived(this.upgrades.reduce((pointTotal, { points }) => pointTotal += points, this.#cost));
  
  validations = $derived(this.#validations
	                       .filter(({ scope }) => scope === 'formation')
                             .map((validation) => new Validation(validation, this)));

  get id () {
    return this.#id;
  }

  get name () {
    return this.#name;
  }

  get allowedUpgrades () {
    return this.#allowedUpgrades;
  }

  get formationType () {
    return this.#formationType;
  }

  addUpgrade (name) {
    this.upgrades.push(new Upgrade(armyList.upgrade(name)));
  }

  removeUpgrade (id) {
    const upgradeIndex = this.upgrades.findIndex((u) => u.id === id);

    if (upgradeIndex > -1) {
      this.upgrades.splice(upgradeIndex, 1);
    }
  }
}

export default Formation;
