const ValidationClasses =
  Object.entries(import.meta.glob('$lib/validations/*-validation.svelte.js', { eager: true }))
    .reduce((validations, [url, module]) => {
      url = url.split('/').pop().replace(/-validation\.svelte\.js$/, '');

      validations[url.toLowerCase().replace(/-(\w)/g, (_, letter) => letter.toUpperCase())] = module.default;

      return validations;
    }, {});

export default ValidationClasses;