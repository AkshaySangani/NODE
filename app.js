// const chalk = require('chalk');
// const yargs = require('yargs');
// const notes = require('./notes');
const mongoose = require('mongoose');
const express = require('express');
const projectRoutes = require('./routes/projectRoutes');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const PORT = 8080;

//customize yargs version
// yargs.version('1.1.0');
//
// //create add command
// yargs.command({
//     command: "add",
//     describe: "Add a new note",
//     builder: {
//         title: {
//             describe: "Note title",
//             demandOption: true,
//             type: 'string'
//         },
//         body: {
//             describe: "note body",
//             demandOption: true,
//             type: 'string',
//         }
//     },
//     handler(argv) {
//         notes.addNotes(argv.title, argv.body);
//     }
// });
//
// //create remove command
// yargs.command({
//     command: "remove",
//     describe: "remove a new note",
//     builder: {
//         title: {
//             describe: 'note title',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler(argv) {
//         notes.removeNote(argv.title);
//     }
// });
//
// //create list command
// yargs.command({
//     command: "list",
//     describe: "list a new note",
//     handler() {
//         notes.listNotes()
//     }
// });
//
// //create read command
// yargs.command({
//     command: "read",
//     describe: "read a new note",
//     builder: {
//         title: {
//             describe: 'note title',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler(argv) {
//         notes.readindNote(argv.title);
//     }
// });
//
// yargs.parse();
// console.log(yargs.argv)
// mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => app.listen(PORT, () => console.log(`server running on :${PORT}`)))
//     .catch((error) => console.log("hi",error.message));

const dbURI = 'mongodb+srv://NOTES:notes@cluster0.swz0g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(function (result) {
        console.log('Database is connected');
    })
    .catch((err) => console.log(err));


app.use(cors());

// "Hello from homepage" is shown  when visiting http://localhost:8080/
app.get('/', (req, res) => res.send('Hello from homepage.'));

// Assign the PORT to our app
app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// project routes
app.use('/projects', projectRoutes);