module.exports = (sequelize, Sequelize) => {
  return sequelize.define("climate_zone", {
    id_climate: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    climate_code: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    country_code: {
      type: Sequelize.STRING
    },
  },  {schema: 'release', timestamps: false, tableName: 'climate_zone'});
};
