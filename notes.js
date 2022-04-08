const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "hii"
};

//adding a new note
const addNotes = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNotes = notes.find((note) => note.title === title);
    // console.log(duplicateNotes)
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        });
        savedNotes(notes);
        console.log(chalk.green("new note added"));
    } else {
        console.log(chalk.yellow.inverse("title already teken"));
    }
};

//revmove notes
const removeNote = (title) => {
    const notes = loadNotes();
    const notesTOKeep = notes.filter((note) => note.title !== title);
    if (notes.length > notesTOKeep.length) {
        console.log(chalk.green('deleted success'));
        savedNotes(notesTOKeep);
    } else {
        console.log(chalk.red.inverse('titled note not found'));
    }
};

//listing Notes
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('your notes'));
    notes.forEach((notes) => {
        console.log(notes.title)
    })
}

//readind notes
const readindNote = (title) => {
    const notes = loadNotes();
    const selectedNote = notes.find((note) => note.title === title);
    ;

    if (selectedNote) {
        console.log(chalk.inverse(selectedNote.title));
        console.log(selectedNote.body);
    } else {
        console.log(chalk.inverse.red("note not found!"))
    }
};

//after command write notes
const savedNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson)
};

//get notes from json file
const loadNotes = () => {
    try {
        const databuffer = fs.readFileSync('notes.json');
        const datJson = databuffer.toString();
        return JSON.parse(datJson)
    } catch (e) {
        return []
    }
};


module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readindNote: readindNote
};