class Upgrade {
  #id;
  #name;
  #costNumber;
  #costString;

  constructor (upgrade) {
    this.#id = crypto.randomUUID();
    this.#name = upgrade.name;
    this.#costNumber = upgrade.costNumber;
    this.#costString = upgrade.costString;
  }

  points = $derived.by(() => {
    let points = +this.#costNumber;

    return points;
  });

  get id () {
    return this.#id;
  }

  get name () {
    return this.#name;
  }

  get pointsString () {
    return this.#costString.split(',').shift();
  }
}

export default Upgrade;
