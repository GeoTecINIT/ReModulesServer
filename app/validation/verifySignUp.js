const db = require("../models");
const User = db.User;

checkEmail = (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        let diffMilliSec = Math.abs( new Date() - user.expiredIn);
        const hours = Math.round(diffMilliSec / (1000 * 60 * 60));
        if ( user.status === 'inactive' && hours > 24) {
          res.status(400).send({
            message: "Token has been expired",
            status: 400
          });
          return;
        } else {
          res.status(400).send({
            message: "Email is already in use",
            status: 400
          });
          return;
        }
      }
      next();
    });
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkEmail
};

module.exports = verifySignUp;
