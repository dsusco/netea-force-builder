import armyList from '$lib/army-list.svelte.js';
import Formation from '$lib/formation.svelte.js';

class Force {
  constructor () {
    $effect.root(() => {
      $effect(() => {
        armyList.name;
        this.formations = [];
      });
    })
  }

  formations = $state([]);

  count = $derived(this.formations.length);

  points = $derived(this.formations.reduce((pointTotal, { points }) => pointTotal += points, 0));

//  validations = $derived(this.#validations
//	                       .filter(({ scope }) => scope === 'force')
//                             .map((validation) => new ValidationClasses[validation.type](validation, this)));
							 
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
