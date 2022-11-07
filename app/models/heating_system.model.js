module.exports = (sequelize, Sequelize) => {
  return sequelize.define("heating_system", {
    system_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    country_code: {
      type: Sequelize.STRING
    },
    system_description: {
      type: Sequelize.STRING
    },
    system_description_original: {
      type: Sequelize.STRING
    },
    picture: {
      type: Sequelize.STRING
    },
  }, {schema: 'release', timestamps: false, tableName: 'heating_system'});
};
