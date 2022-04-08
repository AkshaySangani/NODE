const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//customize yargs version
yargs.version('1.1.0');

//create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "note body",
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
});

//create remove command
yargs.command({
    command: "remove",
    describe: "remove a new note",
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

//create list command
yargs.command({
    command: "list",
    describe: "list a new note",
    handler() {
        notes.listNotes()
    }
});

//create read command
yargs.command({
    command: "read",
    describe: "read a new note",
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readindNote(argv.title);
    }
});

yargs.parse();
// console.log(yargs.argv)
