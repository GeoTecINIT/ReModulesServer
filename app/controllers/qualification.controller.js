const db = require("../models");

const Qualification = db.Qualification;

exports.getAll = (req, res) => {
    Qualification.findAll()
     .then( (data) => {
        res.send(data)
     })
     .catch( (err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving envelope."
        })
     })
}

exports.getId = (req, res) => {
   const ID = req.params.id;

   const condition = ID ? {id: ID} : null;

   Qualification.findOne({
      where: condition
   })
   .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
}