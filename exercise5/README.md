# EXERCÍCIO 05

## Objetivo

Implemente o método `"insert"`. Para isso, é necessário, como sempre, extrair as informações a partir do comando, converter as informações em um objeto e inserir no array "data" da tabela correspondente.

## Instruções

Dados os comandos:

```js
insert into author (id, name, age) values (1, Douglas Crockford, 62)
insert into author (id, name, age) values (2, Linus Torvalds, 47)
insert into author (id, name, age) values (3, Martin Fowler, 54)
```

1. No objeto `"database"`, crie um método chamado `"insert"`, que recebe o comando por parâmetro.

2. Na função `"execute"`, invoque o método `"insert"`.

3. Extraia o nome da tabela para a variável `"tableName"`, as colunas para a variável `"columns"` e os valores para a variável `"values"`.

4. Manipule os valores dentro `"columns"` e `"values"`, separando-os um a um.

5. Crie um objeto chamado `"row"` com base nas colunas e valores.

6. Insira o objeto em `"data"`.

## Cenário

```js
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
```

## Resultado

```json
{
  "tables": {
    "author": {
      "columns": {
        "id": "number",
        "name": "string",
        "age": "number",
        "city": "string",
        "state": "string",
        "country": "string"
      },
      "data": [{
        "id": "1",
        "name": "Douglas Crockford",
        "age": "62"
      }, {
        "id": "2",
        "name": "Linus Torvalds",
        "age": "47"
      }, {
        "id": "3",
        "name": "Martin Fowler",
        "age": "54"
      }]
    }
  }
}
```

## Dicas

Utilize um for, com índice, para percorrer ao mesmo tempo o array de colunas e de valores. Utilize a operação push para incluir no array `"data"`. Não se esqueça de utilizar destructuring para extrair os dados de dentro do array.


## Conteúdo abordado neste exercício

- Function
- for
- if
- Array.prototype.push
- String.prototype.startsWith
- this
- Method Notation
- Destructuring
- String.prototype.match
- String.prototype.split
- String.prototype.trim
- RegExp
- RegExp - Groups
- RegExp - Capture Groups
- RegExp - Quantifiers
- RegExp - Metacharacters
- RegExp - Escape