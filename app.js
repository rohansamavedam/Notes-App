const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//customize yargs version
yargs.version('1.1.0');

//add command
yargs.command({
    command: 'add',
    describe: 'adds a note',
    builder: {
        title: {
            describe: 'title for the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe:'body for the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//remove command
yargs.command({
    command: 'remove',
    describe: 'removes a note',
    builder: {
        title: {
            demandOption: true,
            type: 'string',
            describe: 'title to remove the note'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//listing commmand
yargs.command({
    command:'list',
    describe: 'lists all the notes',
    handler() {
        notes.getNotes()
    }
})

//read command
yargs.command({
    command: 'read',
    describe: 'reads the notes',
    builder: {
        title:{
            demandOption: true,
            type: String,
            describe: 'title to read the note'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()