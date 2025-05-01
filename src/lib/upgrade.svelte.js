class Upgrade {
  #id;
  #name;
  #validations;
  #costNumber;
  #costString;

  constructor (upgrade) {
    this.#id = crypto.randomUUID();
    this.#name = upgrade.name;
    this.#validations = upgrade.validations;
    this.#costNumber = upgrade.costNumber;
    this.#costString = upgrade.costString;
  }

  points = $derived.by(() => {
    let points = this.costNumber;

    return points;
  });

  validations = $derived(this.#validations
	                       .filter(({ scope }) => scope === 'upgrade')
                             .map((validation) => new Validation(validation, this)));

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
