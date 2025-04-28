import { costToNumber, costToString } from '$lib/utilities/cost-formatters.js';

class ArmyList {
  #json = $state({});

  #formationTypes = $derived(this.#json.formationTypes);

  #formations = $derived.by(() => {
    const formations = {};

    for (const [formationType, { formations: formationTypeFormations }] of Object.entries(this.#json.formationTypes)) {
      for (const name of formationTypeFormations) {
        if (formations[name] === undefined) {
          formations[name] = this.#json.formations[name];
          formations[name].formationType = formationType;
        }
      }
    }

    return formations;
  });

  #upgrades = $derived.by(() => {
    const upgrades = {};

    for (const [name, upgrade] of Object.entries(this.#json.upgrades)) {
      upgrades[name] = upgrade;
      upgrades[name].costNumber = costToNumber(upgrade.cost);
      upgrades[name].costString = costToString(upgrade.cost);
    }

    return upgrades;
  });

  name = $derived(this.#json.name);
  formationTypes = $derived(Object.keys(this.#json.formationTypes));
  formations = $derived(Object.keys(this.#json.formations));
  upgrades = $derived(Object.keys(this.#json.upgrades));

  set json (json) {
    this.#json = json;
  }

  formationType (name) {
    const formationType = this.#formationTypes[name];

    if (formationType !== undefined) return { name, ...formationType };
  }

  formation (name) {
    const formation = this.#formations[name];

    if (formation !== undefined) return { name, ...formation };
  }

  upgrade (name) {
    const upgrade = this.#upgrades[name];

    if (upgrade !== undefined) return { name, ...upgrade };
  }
}

const armyList = new ArmyList();

export default armyList;
