const statement = 'create table author (id number, name string, age number, city string, state string, country string)';

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
  execute(statement) {
    if(statement.startsWith('create table')) {
      return this.createTable(statement);
    }
  }
};

database.execute("create table author (id number, name string, age number, city string, state string, country string)")
console.log(JSON.stringify(database, undefined, "  "));