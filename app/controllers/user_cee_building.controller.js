const db = require("../models");

const UserCEEBuilding = db.UserCEEBuilding;

exports.getAll = (req, res) => {
    UserCEEBuilding.findAll()
    .then( (data) => {
       res.send(data);
    })
    .catch( (err) => {
       res.status(500).send({
           message:
               err.message || "Some error occurred while retrieving envelope."
       });
    });
}

exports.getId = (req, res) => {
    const ID = req.params.id;

    const condition = ID ? {id: ID} : null;

    UserCEEBuilding.findOne({
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
        cee_building_id: req.body.cee_building_id,
        user_id: req.body.user_id
    }
 
    UserCEEBuilding.create(body)
       .then((data) => {
          res.send(data);
       })
       .catch((err) => {
          res.status(500).send({
             message:
               err.message || "Some error occurred while creating the user_cee_building."
        });
    });
 }

exports.delete = (req, res) =>{
    const id = req.params.id;
    const condition = id ? {id: id} : null;
 
    UserCEEBuilding.destroy({
       where: condition
    }).then(() => {
       res.send({
          message: "the user_cee_building was delete successfully."
        });
     })
     .catch(() => {
       res.status(500).send({
         message: "Error delete the user_cee_building with id=" + id,
       });
     });
}

exports.deleteIdUserIdCeeBuilding = (req, res) =>{
  const idUser = req.body.idUser;
  const idCeeBuilding = req.body.idCeeBuilding

  const condition = {
    user_id: idUser ? idUser : null,
    cee_building_id: idCeeBuilding ? idCeeBuilding : null
  }

  UserCEEBuilding.destroy({
     where: condition
  }).then(() => {
     res.send({
        message: "the user_cee_building was delete successfully."
      });
   })
   .catch(() => {
     res.status(500).send({
      message: err.message || "Some error occurred while retrieving the buildings.",
    });
   });
}

exports.getIdUser = (req, res) => {
    const userId = req.params.userId;
 
    const condition = userId ? {user_id: userId} : null;
 
    UserCEEBuilding.findAll({
       where: condition
    })
    .then((data) => {
       res.send(data);
     })
     .catch((err) => {
       res.status(500).send({
         message: err.message || "Some error occurred while retrieving the buildings.",
       });
     });
}
 