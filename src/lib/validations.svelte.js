import armyList from '$lib/army-list.svelte.js';
import ValidationClasses from '$lib/validation-classes.svelte.js';
import Validation from '$lib/validations/validation.svelte.js';

class Validations {
  #formationTypeValidations = $derived.by(() => {
    const formationTypeValidations = {};

    for (const name of armyList.formationTypes) {
      const formationType = armyList.formationType(name);
	  
      formationTypeValidations[name] = formationType.validations
	                                    .filter(({ scope }) => scope === undefined)
                                           .map((validation) => new ValidationClasses[validation.type](validation, formationType));
    }

    return formationTypeValidations;
  });
  
  #formationValidations = $derived.by(() => {
    const formationValidations = {};

    for (const name of armyList.formations) {
      const formation = armyList.formation(name);
	  
      formationValidations[name] = formation.validations
	                                 .filter(({ scope }) => scope === undefined)
                                       .map((validation) => new ValidationClasses[validation.type](validation, formation));
    }

    return formationValidations;
  });

  #upgradeValidations = $derived.by(() => {
    const upgradeValidations = {};

    for (const name of armyList.upgrades) {
      const upgrade = armyList.upgrade(name);
	  
      upgradeValidations[name] = upgrade.validations
	                               .filter(({ scope }) => scope === undefined)
                                     .map((validation) => new ValidationClasses[validation.type](validation, upgrade));
    }

    return upgradeValidations;
  });
  
  for (part) {
    if (part.type === 'formationType') return this.forFormationType(part.name);
    if (part.type === 'formation') return this.forFormation(part.name);
    if (part.type === 'upgrade') return this.forUpgrade(part.name);
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
}

const validations = new Validations();

export default validations;
