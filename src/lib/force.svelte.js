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

  points = $derived.by(() => {
    let points = 0;

    for (const { points: formationPoints } of this.formations) {
      points += formationPoints;
    }

    return points;
  });


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
