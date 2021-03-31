module.exports = (sequelize, Sequelize) => {
  return sequelize.define("altitude", {
    altitude_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    minimum_height: {
      type: Sequelize.DECIMAL
    },
    maximum_height: {
      type: Sequelize.DECIMAL
    },
    country_code: {
      type: Sequelize.STRING
    },
    climate_code: {
      type: Sequelize.STRING
    }
  },  {schema: 'public', timestamps: false, tableName: 'altitude'});
};
