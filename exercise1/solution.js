const command = 'create table author (id number, name string, age number, city string, state string, country string)';

const tableRegex = /table\s(\w+)/g;
const columnsRegex = /\((\D+)\)/g;

const resultColumns = columnsRegex.exec(command);

const [_, tableName] = tableRegex.exec(command);
const columns = resultColumns[1].split(', ');

console.log(`tableName = ${tableName}`);
console.log(`columns = ${columns}`);