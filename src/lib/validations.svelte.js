import armyList from '$lib/army-list.svelte.js';
import force from '$lib/force.svelte.js';
import Validation from '$lib/validations/validation.svelte.js';

const ValidationClasses =
  Object.entries(import.meta.glob('$lib/validations/*-validation.svelte.js', { eager: true }))
    .reduce((validations, [url, module]) => {
      url = url.split('/').pop().replace(/-validation\.svelte\.js$/, '');

      validations[url.toLowerCase().replace(/-(\w)/g, (_, letter) => letter.toUpperCase())] = module.default;

      return validations;
    }, {});

class Validations {
  #formationTypeValidations = $derived(Object.fromEntries(armyList.formationTypes.map((name) => {
    const formationType = armyList.formationType(name);

    return [name, formationType.validations.map((validation) => new Validation(validation, formationType))];
  })));

  #formationValidations = $derived(Object.fromEntries(armyList.formations.map((name) => {
    const formation = armyList.formation(name);

    return [name, formation.validations.map((validation) => new Validation(validation, formation))];
  })));

  #upgradeValidations = $derived(Object.fromEntries(armyList.upgrades.map((name) => {
    const upgrade = armyList.upgrade(name);

    return [name, upgrade.validations.map((validation) => new Validation(validation, upgrade))];
  })));

  #formationUpgradeValidations = $derived(Object.fromEntries(force.formations.map(({ id, allowedUpgrades }) =>
    [ id,
      Object.fromEntries(allowedUpgrades.map((name) => {
        const upgrade = armyList.upgrade(name);

        return [name, upgrade.validations.map((validation) => new Validation(validation, { parentId: id, ...upgrade }))] })) ]
  )));

  for (part) {
    if (part.type === 'formationType') return this.forFormationType(part.name);
    if (part.type === 'formation') return this.forFormation(part.name);
    if (part.type === 'upgrade') return this.forUpgrade(part.name);
    if (part.type === 'formationUpgrade') return this.forFormationUpgrade(part.parentId, part.name);
  }

  forFormationType (formationTypeName) {
    return this.#formationTypeValidations[formationTypeName];
  }

  forFormation (formationName) {
    return this.#formationValidations[formationName];
  }

  forUpgrade (upgradeName) {
    return this.#upgradeValidations[upgradeName];
  }

  forFormationUpgrade (parentId, upgradeName) {
    return this.#formationUpgradeValidations[parentId][upgradeName];
  }
}

const validations = new Validations();

export default validations;
