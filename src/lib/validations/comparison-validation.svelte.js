import Validation from '$lib/validations/validation.svelte.js';

class ComparisonValidation extends Validation {
  static OPERATORS = ['<='];

  #operator;

  constructor (validation, part) {
    super(validation, part);
    this.#operator = validation.operator;
  }

  get operator () {
    return this.constructor.OPERATORS.find((operator) => this.#operator === operator) || this.constructor.OPERATORS[0];
  }
}

export default ComparisonValidation;
