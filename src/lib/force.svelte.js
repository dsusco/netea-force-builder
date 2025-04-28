import armyList from '$lib/army-list.svelte.js';
import Formation from '$lib/formation.svelte.js';
import ForceAggregator from '$lib/aggregators/force-aggregator.svelte.js';
import FormationTypeAggregator from '$lib/aggregators/formation-type-aggregator.svelte.js';
import FormationAggregator from '$lib/aggregators/formation-aggregator.svelte.js';
import UpgradeAggregator from '$lib/aggregators/upgrade-aggregator.svelte.js';

class Force {
  #aggregator = new ForceAggregator();

  constructor () {
    $effect.root(() => {
      $effect(() => {
        armyList.name;
        this.formations = [];
      });
    })
  }

  formations = $state([]);

  formationTypeAggregators = $derived(Object.fromEntries(
    armyList.formationTypes.map((name) => [name, new FormationTypeAggregator(name)])));

  formationAggregators = $derived(Object.fromEntries(
    armyList.formations.map((name) => [name, new FormationAggregator(name)])));

  upgradeAggregators = $derived(Object.fromEntries(
    armyList.upgrades.map((name) => [name, new UpgradeAggregator(name)])));

  get count () {
    return this.#aggregator.count;
  }

  get points () {
    return this.#aggregator.points;
  }

  addFormation (name) {
    this.formations.push(new Formation(armyList.formation(name)));
  }

  removeFormation (id) {
    const formationIndex = this.formations.findIndex((f) => f.id === id);

    if (formationIndex > -1) {
      this.formations.splice(formationIndex, 1);
    }
  }
}

const force = new Force();

export default force;
