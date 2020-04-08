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
  select(statement) {
    const regexp = /select (.+) from ([a-z]+)(?: where (.+))?/;
    const parsedStatement = statement.match(regexp);

    let [_, columns, tableName, whereClause] = parsedStatement;
    columns = columns.split(', ');
    
    let rows = this.tables[tableName].data;
    
    if(whereClause) {
      const [columnWhere, valueWhere] = whereClause.split(' = ');
      rows = rows.filter(row => row[columnWhere] === valueWhere);
    }

    rows = rows.map(row => {
      let selectedRow = {};

      columns.forEach(column => {
        selectedRow[column] = row[column];
      });

      return selectedRow;
    });

    return rows;
  },
  delete(statement) {
    const regexp = /delete from ([a-z]+) where (.+)/;
    const parsedStatement = statement.match(regexp);
    const [_, tableName, whereClause] = parsedStatement;

    const [columnWhere, valueWhere] = whereClause.split(' = ');
    
    let rows = this.tables[tableName].data;
    rows = rows.filter(row => row[columnWhere] !== valueWhere);

    this.tables[tableName].data = rows;
  },
  execute(statement) {
    if(statement.startsWith('create table')) {
      return this.createTable(statement);
    }

    if(statement.startsWith('insert into')) {
      return this.insert(statement);
    }

    if(statement.startsWith('select')){
      return this.select(statement);
    }

    if(statement.startsWith('delete')){
      return this.delete(statement);
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
  // console.log(JSON.stringify(database.execute("select name, age from author"), undefined, " "));
  // console.log(JSON.stringify(database.execute("select name, age from author where id = 1"), undefined, " "));
  database.execute("delete from author where id = 2");
  console.log(JSON.stringify(database.execute("select name, age from author"), undefined, "  ")); 
} catch (e) {
  console.log(e.message)
}
