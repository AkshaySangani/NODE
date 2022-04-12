const {Project} = require('../models/project');

const project_get_all = (req, res) => {
    Project.find().sort({createdAt: -1})
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(`There is an error in the server while loading projects`);
        });
};

const project_get_byID = (req, res) => {
    const id = req.params.id;
    Project.findById(id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

const project_create = (req, res) => {
    const project = new Project(req.body);
    project.save()
        .then(result => {
            res.status(201).send(result);
            console.log("addded")
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

const project_update =async (req, res) => {
    try {
        const details = await Project.findByIdAndUpdate({_id : req.params.id}, req.body);
        console.log("req.body",req.body);
        if(details && details._id){
            res.send(details);
        }else {
            res.send("No Record Found");
        }
    } catch ( err ) {
        res.send( err );
        console.log("errrr",err);
    }
};


// exports.update = async ( req, res ) => {
//     try {
//         const details = await User.findByIdAndUpdate({_id : req.params.id}, req.body);
//         console.log(req.body);
//         if(details && details._id){
//             res.send(details);
//         }else {
//             res.send("No Record Found");
//         }
//
//     } catch ( err ) {
//         res.send( err );
//     }
// };


const project_delete = (req, res) => {
    const id = req.params.id;
    Project.findByIdAndDelete(id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

module.exports = {
    project_get_all,
    project_get_byID,
    project_create,
    project_update,
    project_delete
};