const db = require("../models");

const Family = db.Family;

exports.getAll = (req, res) => {
     Family.findAll()
     .then( (data) => {
        res.send(data)
     })
     .catch( (err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Family."
        })
     })
}

exports.getId = (req, res) => {
   const ID = req.params.id;

   const condition = ID ? {id: ID} : null;

   Family.findOne({
      where: condition
   })
   .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Family.",
      });
    });
}