import ValidationClasses from '$lib/validation-classes.svelte.js';

class Upgrade {
  #id;
  #name;
  #validations;
  #costNumber;
  #costString;
  #type;
  #formationId;

  constructor (upgrade, formationId) {
    this.#id = crypto.randomUUID();
    this.#name = upgrade.name;
    this.#validations = upgrade.validations;
    this.#costNumber = upgrade.costNumber;
    this.#costString = upgrade.costString;
    this.#type = upgrade.type;
    this.#formationId = formationId;
  }
  
  formationUpgradeAggregator = $derived(force.formations[this.#formationId].upgradeAggregators[this.name]);

  points = $derived.by(() => {
    let points = this.costNumber;

    return points;
  });

  validations = $derived(this.#validations
						   .filter(({ scope }) => scope === 'upgrade')
					         .map((validation) => new ValidationClasses[validation.type](validation, { name: this.name, type: this.#type, formationId: this.#formationId })));

  get id () {
    return this.#id;
  }

  get name () {
    return this.#name;
  }

  get costNumber () {
    return this.#costNumber;
  }

  get costString () {
    return this.#costString.split(',').shift();
  }
}

export default Upgrade;
