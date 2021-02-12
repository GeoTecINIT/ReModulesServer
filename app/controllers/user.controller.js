const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  if (!req.body.uid) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const user = {
    uid: req.body.uid,
    name: req.body.name,
    email: req.body.email
  };
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });

};

exports.findAll = (req, res) => {

  const name = req.query.name;
  const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

exports.findOne = (req, res) => {

  const uid = req.params.uid;
  const condition = uid ? { uid: `${uid}` } : null;

  User.findOne({where: condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

exports.update = (req, res) => {
  const uid = req.params.uid;
  User.update(req.body, {
    where: { uid: uid }
  })
    .then(response => {
      if (response === 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${uid}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + uid
      });
    });
};

exports.delete = (req, res) => {
  const uid = req.params.uid;
  User.destroy(req.body, {
    where: { uid: uid }
  })
    .then(response => {
      if (response === 1) {
        res.send({
          message: "User was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${uid}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error removing user with id=" + uid
      });
    });
};
