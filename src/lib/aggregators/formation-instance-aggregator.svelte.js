import force from '$lib/force.svelte.js';
import Aggregator from '$lib/aggregators/aggregator.svelte.js';

class FormationInstanceAggregator extends Aggregator {
  #id;

  constructor (part, id) {
    super(part);
    this.#id = id;
  }

  count = undefined;

  subjects = $derived.by(() => {
    console.log(force.formations.map(({ id }) => id ));
    return force.formations.find(({ id }) => this.#id === id).upgrades
  });

  upgrades = $derived(this.subjects.length);

  points = $derived(this.subjects.reduce((pointTotal, { points }) => pointTotal += points, this.part.cost));
}

export default FormationInstanceAggregator;
