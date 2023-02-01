const db = require("../models");

const Tipology = db.Tipology;

exports.getAll = (req, res) => {
    Tipology.findAll()
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

   Tipology.findOne({
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