class ArmyList {
  #json = $state({})

  name = $derived(this.#json.name);

  set json (json) {
    this.#json = json;
  }
}

const armyList = new ArmyList();

export default armyList;
