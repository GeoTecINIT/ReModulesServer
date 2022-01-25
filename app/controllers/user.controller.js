const db = require("../models");
const User = db.User;
const UserRole = db.UserRole;
const Role = db.Roles;
const Op = db.Sequelize.Op;
const { OAuth2Client} = require('google-auth-library');
const  client = new OAuth2Client('539411990207-a7h6he89frbd44dk9hsbndsi6l0iu5u9.apps.googleusercontent.com');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

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
  const userRole = {
    user_id: req.body.uid,
    role_id: 2
  };
  User.create(user)
    .then(data => {
      UserRole.create(userRole)
        .then(userRole => {
          res.send(data);
        })
        .catch( err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User Role."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });

};

exports.findAll = (req, res) => {

  UserRole.findAll(
    {
      include : [
        { model : User
        },
        { model: Role}
      ]
    }
  )
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
  const condition = uid ? { user_id: `${uid}` } : null;

  UserRole.findOne(
    {
      include : [
        { model : User
        },
        { model: Role}
      ],
      where: condition
    }
    )
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

exports.loginGoogle =  async  (req, res ) => {
  const token = req.body.token;
  try {
    const response = await client.verifyIdToken({ idToken: token, audience: '610393934287-nmegsofo3v9cpc33qjlmev54bhca7it8.apps.googleusercontent.com' });
    const { email_verified, name, email} = response.payload;
    if ( email_verified) {
      const user = await User.findOne({
        where: {
          email: email
        },
        include: {
          model: Role,
          as: 'role'
        }
      });
      if (user) {
        const accessToken = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 7200
        });
        /*res.status(200).send({
          name: user.name,
          country: user.country,
          phone: user.phone,
          email: user.email,
          roles: user.role,
          accessToken
        });*/
      } else {
        /*const userRes = await User.create({
          name: name,
          email: email,
          password: bcrypt.hashSync(email+config.secret, 8)
        });
        const userRole = await UserRoles.create( {
          role_id : 2,
          user_id: userRes.id
        });
        const preference = await addPreferenceToUser( req, res, preferencesAll, userRes);

        const accessToken = jwt.sign({ id: userRes.id }, config.secret, {
          expiresIn: 7200
        });
        if( userRes && userRole ){
          res.status(200).send({
            name: userRes.name,
            country: userRes.country,
            phone: userRes.phone,
            email: userRes.email,
            roles: userRes.role,
            accessToken
          });
        }*/
      }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
