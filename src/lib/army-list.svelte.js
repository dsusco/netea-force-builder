import { costToNumber, costToString } from '$lib/utilities/cost-formatters.js';

class ArmyList {
  #json = $state({});

  #formationTypes = $derived.by(() => {
    const formationTypes = {};

    for (const [name, formationType] of Object.entries(this.#json.formationTypes)) {
      formationTypes[name] = formationType;
      formationTypes[name].type = 'formationType';
      formationTypes[name].validations ||= [];
    }

    return formationTypes;
  });

  #formations = $derived.by(() => {
    const formations = {};

    for (const [formationType, { formations: formationTypeFormations }] of Object.entries(this.#json.formationTypes)) {
      for (const name of formationTypeFormations) {
        if (formations[name] === undefined) {
          formations[name] = this.#json.formations[name];
          formations[name].formationType = formationType;
          formations[name].type = 'formation';
          formations[name].upgrades ||= [];
          formations[name].validations ||= [];
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
      upgrades[name].type = 'upgrade';
      upgrades[name].validations ||= [];
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
