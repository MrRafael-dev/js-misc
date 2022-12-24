# code-string
Utilitário para formatação de strings. Um valor pode ser transformado em várias nomenclaturas diferentes.

Para funcionar, é necessário que o valor a ser usado como modelo esteja no formato *dash-case*.
Letras maísculas são mantidas como estão e não serão transformadas.

```javascript
// Retorna "getCPF".
return new CodeString("get-CPF").camel;
```

## Nomenclaturas
Todas as nomenclaturas podem ser vistas abaixo:

```javascript
const fmt = new CodeString("get-element-by-id");

// get-element-by-id
fmt.dash;

// get_element_by_id
fmt.snake;

// GET_ELEMENT_BY_ID
fmt.constant;

// GetElementById
fmt.pascal;

// getElementById
fmt.camel;

// Exportar todas as nomenclaturas para um objeto
fmt.getAll();
```

Existem determinadas situações onde é desejável que todas as letras de uma determinada palavra sejam maiúsculas:

```javascript
const lowerNS = new CodeString("get-elements-by-class-name-ns");
const upperNS = new CodeString("get-elements-by-class-name-NS");

// getElementsByClassNameNs
lowerNS.camel;

// getElementsByClassNameNS
upperNS.camel;
```

## Licença
Lançado sob a licença MIT.
