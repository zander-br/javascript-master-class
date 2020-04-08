const DatabaseError =  function(statement, message) {
  this.statement = statement;
  this.message = message;
}

const database = {
  tables: {},
  createTable(statement) {
    const regexp = /create table ([a-z]+) \((.+)\)/;
    const parsedStatement = statement.match(regexp);
    
    let [_, tableName, columns] = parsedStatement;
    columns = columns.split(', ');

    this.tables = {[tableName]: {
      columns: {},
      data: [],
    }};

    for(let column of columns) {
      const [name, type] = column.split(' ');
      this.tables[tableName].columns[name] = type;
    }
  },
  insert(statement) {
    const regexp = /insert into ([a-z]+) \((.+)\) values \((.+)\)/;
    const parsedStatement = statement.match(regexp);
    
    let [_, tableName, columns, values] = parsedStatement;
    columns = columns.split(', ');
    values = values.split(', ');

    let row = {}
    columns.forEach((column, index) => {
      row[column] = values[index];
    });

    this.tables[tableName].data.push(row);
  },
  execute(statement) {
    if(statement.startsWith('create table')) {
      return this.createTable(statement);
    }

    if(statement.startsWith('insert into')) {
      return this.insert(statement);
    }

    const message = `Syntax error: '${statement}'`;
    throw new DatabaseError(statement, message);
  }
};

try {
  database.execute("create table author (id number, name string, age number, city string, state string, country string)");
  //database.execute("select id, name from author");
  database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
  database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
  database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
  console.log(JSON.stringify(database, undefined, "  ")); 
} catch (e) {
  console.log(e.message)
}
