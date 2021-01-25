module.exports = (sequelize, Sequelize) => {
  const Estate = sequelize.define("estates", {
    rc: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    }
  }, {});

  return Estate;
};