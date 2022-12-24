# Validator

Utilitário de validação de campos simples.

## Uso

As validações podem ser criadas extendendo a classe `Validator` e sobrescrevendo 
o método abstrato `isValid()`:

```javascript
class CodeField extends Validator {
	constructor(value) {
		super(value, `Esperado uma combinação de 4 caracteres.`);
	}

	isValid() {
		if(this.isString()) {
			return this.value.trim().length === 4;
		}
		
		return false;
	}
}

const rightCode = new CodeField("1234");
console.log(rightCode.isValid()? "Correto.": rightCode.expected);

const wrongCode = new CodeField("1");
console.log(wrongCode.isValid()? "Correto.": wrongCode.expected);
```

## Licença
Lançado sob a licença MIT.
