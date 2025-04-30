import aggregators from '$lib/aggregators.svelte.js';
import armyList from '$lib/army-list.svelte.js';
import Upgrade from '$lib/upgrade.svelte.js';

class Formation {
  #id;
  #name;
  #allowedUpgrades;
  #cost;
  #formationType;

  constructor (formation) {
    this.#id = crypto.randomUUID();
    this.#name = formation.name;
    this.#allowedUpgrades = formation.upgrades;
    this.#cost = formation.cost;
    this.#formationType = formation.formationType;
  }

  upgrades = $state([]);

  aggregator = $derived(aggregators.forFormationInstance(this.id));

  points = $derived(this.aggregator.points);

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
