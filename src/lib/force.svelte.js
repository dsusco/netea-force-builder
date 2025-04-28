import armyList from '$lib/army-list.svelte.js';
import Formation from '$lib/classes/formation.svelte.js';
import ForceAggregator from '$lib/classes/aggregators/force-aggregator.svelte.js';
import FormationTypeAggregator from '$lib/classes/aggregators/formation-type-aggregator.svelte.js';
import FormationAggregator from '$lib/classes/aggregators/formation-aggregator.svelte.js';
import UpgradeAggregator from '$lib/classes/aggregators/upgrade-aggregator.svelte.js';

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

  formationTypeAggregators = $derived.by(() => {
    const aggregators = {};

    for (const name of armyList.formationTypes) {
      aggregators[name] = new FormationTypeAggregator(name);
    }

    return aggregators;
  });

  formationAggregators = $derived.by(() => {
    const aggregators = {};

    for (const name of armyList.formations) {
      aggregators[name] = new FormationAggregator(name);
    }

    return aggregators;
  });

  upgradeAggregators = $derived.by(() => {
    const aggregators = {};

    for (const name of armyList.upgrades) {
      aggregators[name] = new UpgradeAggregator(name);
    }

    return aggregators;
  });

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
