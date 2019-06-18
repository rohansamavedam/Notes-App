const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue('Your notes:'))
    console.log('  ')
    notes.forEach(element => {
        console.log(chalk.yellow.inverse(element.title))
        console.log(chalk.yellow(element.body))
        console.log('  ')
    });
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicates = notes.find((note)=>note.title===title)

    if(!(duplicates)){
        notes.push({
            title: title,
            body: body
        })
        const jsonData = JSON.stringify(notes);
        fs.writeFileSync("notes.json",jsonData);
        console.log(chalk.green.inverse('note is added'))
    }
    else{
        console.log(chalk.red.inverse('note could not be added, because it already exists!'))
    }
}

const loadNotes = () => {
    try {
        const bufferData = fs.readFileSync('notes.json')
        const notesJson = bufferData.toString();
        const notes = JSON.parse(notesJson);   
        return notes; 
    } catch (error) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesActual = notes.filter(function(note){
        return !(note.title===title)
    })
    const jsonData = JSON.stringify(notesActual);
    fs.writeFileSync("notes.json",jsonData);
    if(notesActual.length===notes.length){
        console.log(chalk.red.inverse('note could not be found'))
    }
    else{
        console.log(chalk.green.inverse('note removed'))
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title===title)
    if(note===undefined){
        console.log(chalk.red('note with that title DNE'))
    }
    else{
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }

}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}