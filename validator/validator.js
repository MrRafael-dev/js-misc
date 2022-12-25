/**
 * @name validator
 * @version 1.0.1
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
 * class EmailField extends Validator {
 * 		onValidate() {
 * 			return this.isEmail();
 * 		}
 * 
 * 		onFail() {
 * 			return `O endereço de e-mail "${this.value}" está incorreto.`;
 * 		}
 * }
 * 
 * const right = new EmailField("john.doe@example.com").validate();
 * const wrong = new EmailField("@@-.com").validate();
 * 
 * console.log(right); // null
 * console.log(wrong); // O endereço de e-mail "@@-.com" está incorreto.
 */
class Validator {
	/**
	 * @type {unknown}
	 * 
	 * Valor a ser validado.
	 */
	value;

	/**
	 * 
	 * @param {unknown} value Valor a ser validado.
	 */
	constructor(value) {
		this.value = value;
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
	 * 
	 * @returns {boolean}
	 */
	isUndefined() {
		const isUndefined = this.value === undefined;
		return isUndefined;
	}

	/**
	 * Validação de endereços de e-mail.
	 * 
	 * @returns {boolean}
	 */
	isEmail() {
		if(this.isString()) {
			/** @type {string} */
			const value = this.value;
			
			// Validação de valor.
			const atIndex      = value.indexOf("@");
			const lastAtIndex  = value.lastIndexOf("@");
			const startsWithAt = value.startsWith("@");
			const endsWithAt   = value.endsWith("@");

			// Um endereço de e-mail deve possuir apenas um "@".
			if(atIndex < 0 || atIndex !== lastAtIndex || startsWithAt || endsWithAt) {
				return false;
			}
			
			// Charset principal.
			const letters = "abcdefghijklmnopqrstuvwxyz";
			const numbers = "0123456789";
			const symbols = "@.-_";
			const charset = `${letters}${numbers}${symbols}`;

			// Percorrer caracterepara verificar se os caracteres
			// fazem parte do charset correto...
			for(let index = 0; index < value.length; index += 1) {
				const char = value.charAt(index).toLowerCase();
				const charIndex = charset.indexOf(char);

				// Um endereço de e-mail exige um charset específico.
				if(charIndex < 0) {
					return false;
				}
			}
			
			// URL de endereço.
			const url = value.substring(atIndex, value.length);

			// Validação de URL de endereço.
			const urlEmpty         = url.length < 1;
			const urlHasDash       = url.indexOf("_") >= 0;
			const urlBetweenDots   = url.startsWith(".") || url.endsWith(".");
			const urlBetweenDashes = url.startsWith("-") || url.endsWith("-");

			// URLs de endereço não podem conter "_" e nem estar vazio.
			if(urlEmpty || urlHasDash || urlBetweenDots || urlBetweenDashes) {
				return false;
			}

			// Sinalizadores especiais para "." e "-" encontrados.
			let foundDot = false;
			let foundDash = false;

			// Percorrer URL de endereço...
			for(let index = 0; index < url.length; index += 1) {
				const char = value.charAt(index).toLowerCase();

				if(char === ".") {
					// Não podem existir dois ou mais símbolos próximos a um ".".
					if(foundDot || foundDash) {
						return false;
					}

					// Sinalizar "." encontrado e seguir adiante...
					else {
						foundDot = true;
						continue;
					}
				}

				// Resetar sinalizador para "."...
				foundDot = false;

				if(char === "-") {
					// Não pode existir "." próximo a um "-".
					if(foundDot) {
						return false;
					}

					// Sinalizar "-" encontrado e seguir adiante...
					else {
						foundDash = true;
						continue;
					}
				}

				// Resetar sinalizar para "-"...
				foundDash = false;
			}

			return true;
		}

		return false;
	}

	/**
	 * @virtual
	 * 
	 * Evento responsável por retornar o resultado da validação.
	 * 
	 * @returns {boolean}
	 */
	onValidate() {
		return false;
	}

	/**
	 * @virtual
	 * 
	 * Evento responsável por retornar uma mensagem de erro quando
	 * o valor estiver errado.
	 * 
	 * @returns {string}
	 */
	onFail() {
		return "";
	}

	/** 
	 * Método principal de validação. Deve retornar `null` quando o valor estiver
	 * correto, e uma `string` com uma mensagem de erro quando estiver errado.
	 * 
	 * @returns {string | null}
	 */
	validate() {
		return this.onValidate()? null: this.onFail();
	}
}
