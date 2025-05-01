import aggregators from '$lib/aggregators.svelte.js';
import armyList from '$lib/army-list.svelte.js';
import Validation from '$lib/validations/validation.svelte.js';

const ValidationClasses =
  Object.entries(import.meta.glob('$lib/validations/*-validation.svelte.js', { eager: true }))
    .reduce((validations, [url, module]) => {
      url = url.split('/').pop().replace(/-validation\.svelte\.js$/, '');

      validations[url.toLowerCase().replace(/-(\w)/g, (_, letter) => letter.toUpperCase())] = module.default;

      return validations;
    }, {});

class Validations {
  #formationTypeValidations = $derived.by(() => {
    const formationTypeValidations = {};

    for (const name of armyList.formationTypes) {
      const formationType = armyList.formationType(name);
<<<<<<< HEAD

      formationTypeValidations[name] = formationType.validations.map((validation) => new Validation(validation, formationType));
    }

    return formationTypeValidations;
  });

  #formationValidations = $derived.by(() => {
    const formationValidations = {};

    for (const name of armyList.formations) {
      const formation = armyList.formation(name);

      formationValidations[name] = formation.validations.map((validation) => new Validation(validation, formation));
    }

    return formationValidations;
  });

  #upgradeValidations = $derived.by(() => {
    const upgradeValidations = {};

    for (const name of armyList.upgrades) {
      const upgrade = armyList.upgrade(name);

      upgradeValidations[name] = upgrade.validations.map((validation) => new Validation(validation, upgrade));
    }

    return upgradeValidations;
  });

  #formationInstanceValidations = $derived.by(() => {
    const formationInstanceValidations = {};

    for (const { id, name } of force.formations) {
      const formation = armyList.formation(name);

      formationInstanceValidations[id] = formation.validations.map((validation) => new Validation(validation, { id, ...formation }));
    }

    return formationInstanceValidations;
  });

  #formationUpgradeValidations = $derived.by(() => {
    const formationUpgradeValidations = {};

    for (const { id, allowedUpgrades } of force.formations) {
      formationUpgradeValidations[id] = {};

      for (const name of allowedUpgrades) {
        const upgrade = armyList.upgrade(name);

        upgradeValidations[name] = upgrade.validations.map((validation) => new Validation(validation, { parentId: id, ...upgrade }));
      }
    }

    return formationUpgradeValidations;
  });
=======
	  
      formationTypeValidations[name] = formationType.validations
	                                    .filter(({ scope }) => scope === undefined || scope === 'force')
                                           .map((validation) => new Validation(validation, aggregators.for(formationType)));
    }

    return formationTypeValidations;
  });
  
  #formationValidations = $derived.by(() => {
    const formationValidations = {};

    for (const name of armyList.formations) {
      const formation = armyList.formation(name);
	  
      formationValidations[name] = formation.validations
	                                 .filter(({ scope }) => scope === undefined || scope === 'force')
                                       .map((validation) => new Validation(validation, aggregators.for(formation)));
    }

    return formationValidations;
  });

  #upgradeValidations = $derived.by(() => {
    const upgradeValidations = {};

    for (const name of armyList.upgrades) {
      const upgrade = armyList.upgrade(name);
	  
      upgradeValidations[name] = upgrade.validations
	                               .filter(({ scope }) => scope === undefined || scope === 'force')
                                     .map((validation) => new Validation(validation, aggregators.for(upgrade)));
    }

    return upgradeValidations;
  });
  
  for (part) {
    if (part.type === 'formationType') return this.forFormationType(part.name);
    if (part.type === 'formation') return this.forFormation(part.name);
    if (part.type === 'upgrade') return this.forUpgrade(part.name);
  }
>>>>>>> 7d82c859ff10d2466b4d14bef93a3cf3fd4586b8

  forFormationType (formationTypeName) {
    return this.#formationTypeValidations[formationTypeName];
  }

  forFormation (formationName) {
    return this.#formationValidations[formationName];
  }

  forUpgrade (upgradeName) {
    return this.#upgradeValidations[upgradeName];
  }
<<<<<<< HEAD

  forFormationInstance (id) {
    return this.#formationInstanceValidations[id];
  }

  forFormationUpgrade (parentId, upgradeName) {
    return this.#formationUpgradeValidations[parentId][upgradeName];
  }
=======
>>>>>>> 7d82c859ff10d2466b4d14bef93a3cf3fd4586b8
}

const validations = new Validations();

export default validations;
