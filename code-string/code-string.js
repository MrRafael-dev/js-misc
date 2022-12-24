/**
 * @name code-string
 * @version 1.0.0
 * @description Utilitário para formatação de strings.
 * @author Mr.Rafael
 * @license MIT
 */

/**
 * @typedef CodeStringList
 * 
 * Lista de strings formatadas, em todas as nomenclaturas disponíveis.
 * 
 * @prop {string} dash String (em *dash-case*).
 * @prop {string} snake String (em *snake_case*).
 * @prop {string} constant String (em *CONSTANT_CASE*).
 * @prop {string} pascal String (em *PascalCase*).
 * @prop {string} camel String (em *camelCase*).
 */

/**
 * @typedef CodeStringCache
 * 
 * Lista de strings formatadas, em todas as nomenclaturas disponíveis.
 * 
 * Esta é utilizada apenas pelo cache interno da classe `CodeString` e não
 * possui muita utilidade. Para obter todas as strings, exporte-as utilizando
 * o método `getAll()` e utilize o tipo `CodeStringList` para identificá-las.
*
* @prop {string | null} dash String (em *dash-case*).
* @prop {string | null} snake String (em *snake_case*).
* @prop {string | null} constant String (em *CONSTANT_CASE*).
* @prop {string | null} pascal String (em *PascalCase*).
* @prop {string | null} camel String (em *camelCase*).
*/

/**
 * @class CodeString
 * @description
 * 
 * Utilitário para formatação de strings. Um valor pode ser transformado em
 * várias nomenclaturas diferentes.
 * 
 * Para funcionar, é necessário que o valor a ser usado como modelo esteja no
 * formato *dash-case*. Letras maísculas são mantidas como estão e não serão
 * transformadas.
 * 
 * @example
* // Retorna "getCPF".
* return new CodeString("get-CPF").camel;
*/
export class CodeString {
 /**
	* @private
	* @type {string}
	* 
	* String original para transformação (em *dash-case*).
	*/
 _value;

 /**
	* @private
	* @type {CodeStringCache}
	* 
	* Cache de strings formatadas.
	*/
 _cache;

 /**
	* @constructor
	* 
	* @param {string} value String (em *dash-case*).
	*/
 constructor(value) {
	 this._value = value;
	 this._cache = {
		 dash: null,
		 snake: null,
		 constant: null,
		 pascal: null,
		 camel: null
	 };
 }

 /**
	* Exporta todas as nomenclaturas para um objeto.
	* 
	* @returns {CodeStringList}
	*/
 getAll() {
	 return {
		 dash: this.dash,
		 snake: this.snake,
		 constant: this.constant,
		 pascal: this.pascal,
		 camel: this.camel
	 };
 }

 /**
	* @type {string}
	* 
	* String (em *dash-case*).
	*/
 get dash() {
	 if (this._cache.dash === null) {
		 this._cache.dash = this._value.toLowerCase();
	 }

	 return this._cache.dash;
 }


 /**
	* @type {string}
	* 
	* String (em *snake_case*).
	*/
 get snake() {
	 if (this._cache.snake === null) {
		 this._cache.snake = this._value.replaceAll("-", "_").toLowerCase();
	 }

	 return this._cache.snake;
 }

 /**
	* @type {string}
	* 
	* String (em *CONSTANT_CASE*).
	*/
 get constant() {
	 if (this._cache.constant === null) {
		 this._cache.constant = this._value.replaceAll("-", "_").toUpperCase();
	 }

	 return this._cache.constant;
 }

 /**
	* @type {string}
	* 
	* String (em *PascalCase*).
	*/
 get pascal() {
	 if (this._cache.pascal === null) {
		 // Tokens da string em "dash-case", e resultado gerado em "PascalCase".
		 const tokens = this._value.split("-");
		 let result = "";

		 // Percorrer tokens...
		 for (const token of tokens) {

			 // Percorrer caracteres do token...
			 for (let index = 0; index < token.length; index += 1) {
				 const char = token.charAt(index);
				 const upperChar = char.toUpperCase();
				 const isUpperCase = char === upperChar;

				 // Concatenar resultado...
				 result += index === 0 || isUpperCase ? upperChar : char;
			 }
		 }

		 // Cachear resultado:
		 this._cache.pascal = result;
	 }

	 return this._cache.pascal;
 }

 /**
	* @type {string}
	* 
	* String (em *camelCase*).
	*/
 get camel() {
	 if (this._cache.camel === null) {
		 // Tokens da string em "dash-case", resultado gerado em "camelCase", e
		 // uma variável de controle para o primeiro token (a primeira palavra não
		 // inicia em letra maiúscula).
		 const tokens = this._value.split("-");
		 let result = "";
		 let hasFirstTokenPassed = false;

		 // Percorrer tokens...
		 for (const token of tokens) {

			 // Percorrer caracteres do token...
			 for (let index = 0; index < token.length; index += 1) {
				 const char = token.charAt(index);
				 const upperChar = char.toUpperCase();
				 const isUpperCase = char === upperChar;

				 // Concatenar resultado...
				 result += (index === 0 && hasFirstTokenPassed) || isUpperCase ? upperChar : char;
			 }

			 // Sinalizar que o primeiro token já foi processado:
			 hasFirstTokenPassed = true;
		 }

		 // Cachear resultado:
		 this._cache.camel = result;
	 }

	 return this._cache.camel;
 }
}
