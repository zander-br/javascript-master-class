const command = 'create table author (id number, name string, age number, city string, state string, country string)';

const tableRegex = /table\s(\w+)/g;
const columnsRegex = /\((\D+)\)/g;

const resultColumns = columnsRegex.exec(command);

const [_, tableName] = tableRegex.exec(command);
const columns = resultColumns[1].split(', ');

const database = {
  tables: {
    [tableName]: {
      columns: {},
      data: [],
    },
  },
};

for(let column of columns) {
  const [name, type] = column.split(' ');
  database.tables[tableName].columns[name] = type;
}

console.log(JSON.stringify(database, undefined, ' '));