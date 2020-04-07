const command = 'create table author (id number, name string, age number, city string, state string, country string)';

function execute(command) {
  return database.createTable(command);
}

const database = {
  tables: {},
  createTable(command) {
    const tableRegex = /table\s(\w+)/g;
    const columnsRegex = /\((\D+)\)/g;
    
    const resultColumns = columnsRegex.exec(command);
    
    const [_, tableName] = tableRegex.exec(command);
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
  execute(command) {
    if(command.startsWith('create table')) {
      this.createTable(command);
    }
  }
};

database.execute("create table author (id number, name string, age number, city string, state string, country string)")
console.log(JSON.stringify(database, undefined, "  "));