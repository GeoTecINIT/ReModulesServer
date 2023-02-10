const db = require("../models");
const fs = require('fs');

const Image = db.Image;


exports.getAll = (req, res) => {
    Image.findAll()
    .then( (data) => {
       res.send(data)
    })
    .catch( (err) => {
       res.status(500).send({
           message:
               err.message || "Some error occurred while retrieving Image."
       })
    })
}

exports.getId = (req, res) => {
  const ID = req.params.id;

  const condition = ID ? {id: ID} : null;

  Image.findOne({
     where: condition
  })
  .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while retrieving Image.",
     });
   });
}

exports.create = (req, res) => {
    let files = req.files.file;
    let testimonyId = req.body.testimony_id;
    let guid = req.body.guid;

    console.log(files, req.body)

    let folder = './uploads/imagesTestimony/';

    for(let i = 0; i < files.length; i++){
        let currentFile = files[i];

        let oldName = currentFile.path.substring(24);
        let name = currentFile.originalFilename;
        let type = currentFile.type.substring(0,5);
        let extension = currentFile.type.substring(6);

        console.log('imagen n' + i + ' -> ', oldName, name, type, extension);

        if(!fs.existsSync(folder + guid + '/')){
            fs.mkdirSync(folder + guid + '/');
        }

        let pathComplete = folder + guid + '/' + name + '.' + extension;

        fs.rename(folder + oldName, pathComplete, (error) => {
         if(error){
            res.send(error)
         }
        });

        let body = {
          name: pathComplete,
          testimony_id: testimonyId
        }

        Image.create(body)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          /*res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the User Role.",
          });*/
        });

    }
}