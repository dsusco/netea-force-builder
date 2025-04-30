import armyList from '$lib/army-list.svelte.js';
import force from '$lib/force.svelte.js';
import ForceAggregator from '$lib/aggregators/force-aggregator.svelte.js';
import FormationTypeAggregator from '$lib/aggregators/formation-type-aggregator.svelte.js';
import FormationAggregator from '$lib/aggregators/formation-aggregator.svelte.js';
import UpgradeAggregator from '$lib/aggregators/upgrade-aggregator.svelte.js';
import FormationInstanceAggregator from '$lib/aggregators/formation-instance-aggregator.svelte.js';
import FormationUpgradeAggregator from '$lib/aggregators/formation-upgrade-aggregator.svelte.js';

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

  #formationInstanceAggregators = $derived.by(() => {
    const formationInstanceAggregators = {};

    for (const { id, name } of force.formations) {
      formationInstanceAggregators[id] = new FormationInstanceAggregator(armyList.formation(name), id);
    }

    return formationInstanceAggregators;
  });

  #formationUpgradeAggregators = $derived.by(() => {
    const formationUpgradeAggregators = {};

    for (const { id, allowedUpgrades } of force.formations) {
      formationUpgradeAggregators[id] = {};

      for (const name of allowedUpgrades) {
        formationUpgradeAggregators[id][name] = new FormationUpgradeAggregator(armyList.upgrade(name), id);
      }
    }

    return formationUpgradeAggregators;
  });

  forceAggregator = $derived(new ForceAggregator());

  for (part) {
    if (part.id && part.type === 'formation') return this.forFormationInstance(part.id);
    if (part.parentId && part.type === 'upgrade') return this.forFormationUpgrade(part.parentId, part.name);
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

  forFormationInstance (id) {
    return this.#formationInstanceAggregators[id];
  }

  forFormationUpgrade (parentId, upgradeName) {
    return this.#formationUpgradeAggregators[parentId][upgradeName];
  }
}

const aggregators = new Aggregators();

export default aggregators;
