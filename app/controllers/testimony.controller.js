const db = require("../models");

const Testimony = db.Testimony;

exports.getAll = (req, res) => {
     Testimony.findAll()
     .then( (data) => {
        res.send(data)
     })
     .catch( (err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Testimony."
        })
     })
}

exports.getId = (req, res) => {
   const ID = req.params.id;

   const condition = ID ? {id: ID} : null;

   Testimony.findOne({
      where: condition
   })
   .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Testimony.",
      });
    });
}


exports.create = (req, res) => {

   let body = {
      name: req.body.name,
      quote: req.body.quote,
      role: req.body.role,
      video_url: req.body.video_url,
      cee_building_dwelling_id: req.body.cee_building_dwelling_id
   }

    Testimony.create(body)
       .then((data) => {
          res.send(data);
       })
       .catch((err) => {
          res.status(500).send({
             message:
               err.message ||
               "Some error occurred while creating the Testimony.",
          });
       });
 }
 
exports.update = (req, res) => {
 
    const body = {
        name: req.body.name,
        quote: req.body.quote,
        role: req.body.role,
        video_url: req.body.video_url,
        cee_buidling_id: req.body.cee_buidling_id
    }
    const id = req.body.id;
    const condition = id ? {id: id} : null;
 
    Testimony.update(body, {
       where: condition
    }).then(() => {
       res.send({
          message: "Testimony was updated successfully.",
        });
     })
     .catch(() => {
       res.status(500).send({
         message: "Error updating Testimony with id=" + id,
       });
     });
 
}
 
exports.delete = (req, res) =>{
    const id = req.params.id;
    const condition = id ? {id: id} : null;
 
    Testimony.destroy({
       where: condition
    }).then(() => {
       res.send({
          message: "Testimony was delete successfully.",
        });
     })
     .catch(() => {
       res.status(500).send({
         message: "Error delete Testimony with id=" + id,
       });
     });
}

exports.getIdDwelling = (req, res) => {
   const id = req.params.id;

   const condition = id ? {cee_building_dwelling_id: id} : null;

   Testimony.findOne({
      where: condition
   })
   .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Testimony.",
      });
    });
}