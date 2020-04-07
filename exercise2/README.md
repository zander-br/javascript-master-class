# EXERCÍCIO 02

## Objetivo

Com base no nome da tabela e nas colunas, monte uma estrutura de objetos para armazenar tanto a definição da tabela quanto os dados.

## Instruções

Dado o comando:

```sql
create table author (id number, name string, age number, city string, state string, country string)
```

1. Crie um objeto chamado "database".

2. Dentro do objeto "database", crie um objeto chamado "tables".

3. Dentro do objeto "tables", crie um objeto com o nome da tabela.

4. Dentro do objeto criado com o nome da tabela, crie um objeto chamado "columns", onde as chaves são representadas pelo nome da coluna e o valor pelo tipo.

5. Dentro do objeto criado com nome da tabela, crie um array chamado "data".

6. Exiba o conteúdo do objeto "database" utilizando JSON.stringify


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
            "data": []
        }
    }
}
```

## Dicas

Percorra as colunas com for/of e utilize a notação de [] tanto para criar e acessar as propriedades nos objetos. É possível utilizar um parâmetro na operação JSON.stringify para formatar o objeto. Para isso, passe como terceiro parâmetro alguns espaços em branco ou o caracter tab.


## Conteúdo abordado neste exercício

- Object
- for/of
- String.prototype.trim()
- JSON.stringify
