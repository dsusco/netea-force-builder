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

  name = $derived(this.#json.name);
  formationTypes = $derived(Object.keys(this.#json.formationTypes));
  formations = $derived(Object.keys(this.#json.formations));

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
}

const armyList = new ArmyList();

export default armyList;
