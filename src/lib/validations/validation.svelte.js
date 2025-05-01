import aggregators from '$lib/aggregators.svelte.js';
import force from '$lib/force.svelte.js';

class Validation {
  static ONS = ['count', 'points'];
  static SCOPES = ['force', 'formation', 'upgrade', 'formationUpgrade'];
  
  #on;
  #scope;
  #value;
  #part;
  

  constructor (validation, part) {
    this.#on = validation.on;
    this.#scope = validation.scope;
    this.#value = validation.value;
    this.#part = part;
  }

  aggregator = $derived(aggregators.for(this.#part));
  
  aggregatorValue = $derived(this.aggregator[this.on]);
  
  normalizedValue = $derived.by(() => {
	let normalizedValue = this.value;
	
	if (normalizedValue < 1) {
	  switch (this.scope) {
		case 'force':
		  normalizedValue *= force[this.on];
	  }
	}
	
	return normalizedValue;
  });
  
  get on () {
    return this.constructor.ONS.find((on) => this.#on === on) || this.constructor.ONS[0];
  }
  
  get scope () {
    return this.constructor.SCOPES.find((scope) => this.#scope === scope) || this.constructor.SCOPES[0];
  }

  get value () {
    let value = this.#value;

    if (typeof value === 'string') {
      value = value.split('/');
      value = +value[0] / (+value[1] || 1);
    }

    return +value;
  }
}

export default Validation;
