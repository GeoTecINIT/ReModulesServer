const db = require("../models");

const Monitoring = db.Monitoring;

exports.getAll = (req, res) => {
     Monitoring.findAll()
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

   Monitoring.findOne({
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

exports.create = (req, res) => {

   let body = {
      cee_building_dwelling_id: req.body.cee_building_dwelling_id,
      season_id: req.body.season_id,
      phase_id: req.body.phase_id,
      family_id: req.body.family_id,
      variables_id: req.body.variables_id
   }

   Monitoring.create(body)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the User Role.",
         });
      });
}

exports.update = (req, res) => {

    const body = {
      cee_building_id: req.body.cee_building_id,
      season_id: req.body.season_id,
      phase_id: req.body.phase_id,
      family_id: req.body.family_id,
      file_id: req.body.file_id,
      variables_id: req.body.variables_id
    }
   const id = req.params.id;
   const condition = id ? {id: id} : null;

   Monitoring.update(body, {
      where: condition
   }).then(() => {
      res.send({
         message: "Monitoring was updated successfully.",
       });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Monitoring with id=" + id,
      });
    });

}

exports.delete = (req, res) =>{
   const id = req.params.id;
   const condition = id ? {id: id} : null;

   Monitoring.destroy({
      where: condition
   }).then(() => {
      res.send({
         message: "Monitoring was delete successfully.",
       });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error delete Monitoring with id=" + id,
      });
    });
}


exports.getIdDwelling = (req, res) => {
   const ID = req.params.id;

   const condition = ID ? {cee_building_dwelling_id: ID} : null;

   Monitoring.findAll({
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