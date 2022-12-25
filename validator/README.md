# Validator

Utilitário de validação de campos simples.

## Uso

As validações podem ser criadas extendendo a classe `Validator` e sobrescrevendo 
os eventos `onValidate()` e `onFail()`.

A classe inclui algumas verificações simples, que podem ser utilizadas para construir
validações mais complexas.

```javascript
class EmailField extends Validator {
	onValidate() {
		return this.isEmail();
	}

	onFail() {
		return `O endereço de e-mail "${this.value}" está incorreto.`;
	}
}

const right = new EmailField("john.doe@example.com").validate();
const wrong = new EmailField("@@-.com").validate();

console.log(right); // null
console.log(wrong); // O endereço de e-mail "@@-.com" está incorreto.
```

## Licença
Lançado sob a licença MIT.
