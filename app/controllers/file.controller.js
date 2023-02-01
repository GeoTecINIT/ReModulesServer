const db = require("../models");
const fs = require('fs');

const File = db.File;

exports.getAll = (req, res) => {
     File.findAll()
     .then( (data) => {
        res.send(data)
     })
     .catch( (err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving File."
        })
     })
}

exports.getId = (req, res) => {
   const ID = req.params.id;

   const condition = ID ? {id: ID} : null;

   File.findOne({
      where: condition
   })
   .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving File.",
      });
    });
}

exports.upload = (req, res) => {
   console.log(req.files, req.body)

   let file = req.files.file
   let filePath = './uploads/' + file.path.substring(8); //nombre por defecto
   let nameFile = file.originalFilename; //nombre que quiero ponerle

   console.log(file);
   console.log(file.path.substring(8))

   let buffer = null;
   let body = {
      value: null,
      time_stamp: null,
      uid: req.body.guid,
      monitoring_id: req.body.id_monitoring
   }

   try {
      buffer = fs.readFileSync(filePath, { encoding: 'utf-8'})
      fs.unlinkSync(filePath);
      console.log('contenido del archivo en node -> ', buffer.toString());
      let textoArray = buffer.toString().split(';');
      console.log(textoArray);

      body.value = textoArray[2];
      body.time_stamp = textoArray[3];
      console.log('value -> ' + body.value, "time -> " + body.time_stamp)
      console.log("body -> ", body);

      File.create(body)
         .then((data) => {
            res.send(data);
         })
         .catch((err) => {
         res.status(500).send({
            message:
              err.message || "Some error occurred while creating the File.",
         });
      });
   } catch (error) {
      console.log(error);
      res.send(error);
   }

   fs.writeFile('./uploads/filesMonitoring/' + nameFile, buffer, {flag: 'a+'}, (error) => {
      if(error){
         console.log(error)
         res.send('File is not uploaded')
      }
   });
}