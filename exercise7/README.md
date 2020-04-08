# EXERCÍCIO 07

## Objetivo

Implemente o método `"delete"`. Para isso, é necessário extrair as informações a partir do comando e excluir os dados de acordo com a cláusula `"where"`.

## Instruções

Dada o comando:

```sql
delete from author where id = 2
```

1. Crie um método chamado `"delete"`.

2. Na função `"execute"`, invoque o método `"delete"`.

3. Extraia a cláusula **where** do comando.

4. Crie as variáveis **columnWhere** e **valueWhere**.

5. Filtre os registros conforme a cláusula **where**.

6. Exclua os registros.


## Cenário

```js
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
database.execute("delete from author where id = 2");
database.execute("select name, age from author");
```

## Resultado

```json
[{
    "name": "Douglas Crockford",
    "age": "62"
}, {
    "name": "Martin Fowler",
    "age": "54"
}]
```

## Dicas

Você pode utilizar a operação Array.prototype.filter filtrar os elementos do array.

## Conteúdo abordado neste exercício

- Object
- Array
- Array.prototype.filter