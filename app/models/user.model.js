module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    uid: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });
  return User;
};
