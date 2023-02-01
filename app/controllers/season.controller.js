const db = require("../models");

const Season = db.Season;

exports.getAll = (req, res) => {
     Season.findAll()
     .then( (data) => {
        res.send(data)
     })
     .catch( (err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Season."
        })
     })
}

exports.getId = (req, res) => {
   const ID = req.params.id;

   const condition = ID ? {id: ID} : null;

   Season.findOne({
      where: condition
   })
   .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Season.",
      });
    });
}