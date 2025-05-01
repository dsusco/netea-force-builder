import force from '$lib/force.svelte.js';
import Validation from '$lib/validations/validation.svelte.js';

class ComparisonValidation extends Validation {
  static OPERATORS = ['<='];

  #operator;

  constructor (validation, part) {console.log(part.name, validation.on, validation.operator, validation.value);
    super(validation, part);
    this.#operator = validation.operator;
  }

  get operator () {
    return this.constructor.OPERATORS.find((operator) => this.#operator === operator) || this.constructor.OPERATORS[0];
  }
  
  valid = $derived.by(() => {
    let valid = false;

    if (this.operator === '<=') {
      valid = this.aggregatorValue <= this.normalizedValue;
    }
	
	return valid;
  });
}

export default ComparisonValidation;

/*

agg / scope <= value

agg <= value * scope

  validWith (mutations) {
    let
      valid = false,
      aggregatorValue = this.aggregator[this.on] + +mutations[this.on],
      relativeToValue = this.value;

    if (this.relativeTo === force) {
      if (this.value < 1) {
        relativeToValue *= this.relativeTo[this.on] + +mutations[this.on];
      }
    } else {
      relativeToValue *= this.relativeTo[this.on];
    }

    if (this.operator === '<=') {
      valid = aggregatorValue <= relativeToValue;
    }

    return valid;
  };
*/