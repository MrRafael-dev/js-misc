/**
 * @name validator
 * @version 1.0.0
 * @description Utilitário de validação de campos simples.
 * @author Mr.Rafael
 * @license MIT
 */

/**
 * @abstract
 * @class Validator
 * 
 * @description
 * Utilitário de validação de campos simples.
 * 
 * @example
 * class CodeField extends Validator {
 * 		constructor(value) {
 * 			super(value, `Esperado uma combinação de 4 caracteres.`);
 * 		}
 * 
 * 		isValid() {
 * 			if(this.isString()) {
 * 				return this.value.trim().length === 4;
 * 			}
 * 
 *		 	return false;
 * 		}
 * }
 * 
 * const rightCode = new CodeField("1234");
 * console.log(rightCode.isValid()? "Correto.": rightCode.expected);
 * 
 */
class Validator {
	/**
	 * @type {unknown}
	 * 
	 * Valor a ser validado.
	 */
	value;

	/**
	 * @type {string}
	 * 
	 * Descrição de erro de validação.
	 */
	expected;

	/**
	 * 
	 * @param {unknown} value Valor a ser validado.
	 * @param {string} expected Descrição de erro de validação.
	 */
	constructor(value, expected = "") {
		this.value = value;
		this.expected = expected;
		this.hasPassed = false;
	}

	/**
	 * Validação de strings.
	 * 
	 * @returns {boolean}
	 */
	isString() {
		const isTypeOfString = typeof this.value === "string";
		const isInstanceOfString = this.value instanceof String;

		return isTypeOfString || isInstanceOfString;
	}

	/**
	 * Validação de números.
	 * 
	 * @returns {boolean}
	 */
	isNumber() {
		const isTypeOfNumber = typeof this.value === "number";
		const isInstanceOfNumber = this.value instanceof Number;

		return isTypeOfNumber || isInstanceOfNumber;
	}

	/**
	 * Validação de números inteiros.
	 * 
	 * @returns {boolean}
	 */
	isInteger() {
		const isSafeInteger = Number.isSafeInteger(this.value);
		return isSafeInteger;
	}

	/**
	 * Validação de datas.
	 * 
	 * @returns {boolean}
	 */
	isDate() {
		const isInstanceOfDate = this.value instanceof Date;
		return isInstanceOfDate;
	}

	/**
	 * Validação de valores nulos.
	 * 
	 * @returns {boolean}
	 */
	isNull() {
		const isNull = this.value === null;
		return isNull;
	}

	/**
	 * Validação de valores não inicializados.
	 * @returns {boolean}
	 */
	isUndefined() {
		const isUndefined = this.value === undefined;
		return isUndefined;
	}

	/**
	 * @abstract
	 * 
	 * Método principal de validação.
	 * 
	 * @returns {boolean}
	 */
	isValid() {
	}
}
