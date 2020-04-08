const statement = 'create table author (id number, name string, age number, city string, state string, country string)';

const DatabaseError =  function(statement, message) {
  this.statement = statement;
  this.message = message;
}

const database = {
  tables: {},
  createTable(statement) {
    const tableRegex = /table\s(\w+)/g;
    const columnsRegex = /\((\D+)\)/g;
    
    const resultColumns = columnsRegex.exec(statement);
    
    const [_, tableName] = tableRegex.exec(statement);
    const columns = resultColumns[1].split(', ');

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
    const tableRegex = /into\s(\w+)/g;
    const columnsRegex = /\((\D+)\)/g;
    const valuesRegex = /values\s\((.+)\)/g

    const resultColumns = columnsRegex.exec(statement);
    const resultValues = valuesRegex.exec(statement);

    const [_, tableName] = tableRegex.exec(statement);
    const columns = resultColumns[1].split(', ');
    const values = resultValues[1].split(', ');

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
