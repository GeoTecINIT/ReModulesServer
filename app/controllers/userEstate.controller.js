const db = require('../models');
const Estate = db.Estate;
const UserEstate = db.UserEstate;
const Users = db.User;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  if (!req.body.rc) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const estateToSave = {
    rc: req.body.rc,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng,
    year: req.body.year,
    use: req.body.use,
    surface: req.body.surface
  };

  Users.findOne({ where: { uid: req.body.uid}}).then( user => {
    Estate.findOne({where: { rc: estateToSave.rc}}).then( estate => {
      if ( estate !== null ){
        const userEstate = {
          id_user: user.uid,
          id_estate: estate.rc
        };
        UserEstate.create(userEstate)
          .then( data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Estate."
            });
          });
      } else {
        Estate.create(estateToSave)
          .then(data => {
              const userEstate = {
                id_user: user.uid,
                id_estate: data.rc
              };
              UserEstate.create(userEstate)
                .then( data => {
                  res.send(data);
                })
                .catch(err => {
                  res.status(500).send({
                    message:
                      err.message || "Some error occurred while creating the Estate."
                  });
                });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Estate."
            });
          });
      }
    });
  });
};

exports.findHistoryByUser = (req, res) => {
  const user = req.params.id;
  const condition = user ? { uid: `${user}` } : null;
  Estate.findAll({ include: [ { model: Users,  as: 'users', where: condition } ]})
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

exports.getUses = (req, res) => {
  Estate.aggregate('use', 'DISTINCT', { plain: false})
    .then( data =>{
      res.send(data);
    })
    .catch( err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving uses."
      });
    });
};

exports.deletePropFromHistory = ( req, res ) => {

  const user = req.params.user;
  const prop = req.params.rc;
  const condition = user && prop ? {
    [Op.and]: [
      { id_user: `${user}`},
      { id_estate: `${prop}`}
    ]
  } : null;
  UserEstate.destroy({
    where: condition
  })
  .then(data => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing ${prop} from history."
    });
  });
};
