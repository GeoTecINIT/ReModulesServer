module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    uid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  }, {schema: 'public'});
};
