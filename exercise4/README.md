# EXERCÍCIO 04

## Objetivo

Lance uma exceção caso o comando não exista, interrompendo o fluxo de execução.

## Instruções

1. Crie uma função construtora chamada `"DatabaseError"` que recebe dois parâmetros: `"statement"` e `"message"`.

2. Dentro do método `"execute"`, caso o comando passado por parâmetro não exista, instancie a função construtora `"DatabaseError"`, lançando-a como um erro.

3. Envolva a chamada para o objeto `"database"` em um bloco **try/catch** imprimindo a propriedade `"message"` do objeto `"DatabaseError"`.

## Cenário

```js
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("select id, name from author");
```

## Resultado

```bash
"Syntax error: 'select id, name from author'"
```

## Dicas

Não esqueça de utilizar o operador new para instanciar a função construtora "DatabaseError" e de utilizar Template Literals para montar a mensagem de erro.

## Conteúdo abordado neste exercício

- new
- throw
- try
- catch
- Template Literals
- Constructor Function