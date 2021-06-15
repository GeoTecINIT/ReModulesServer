module.exports = (sequelize, Sequelize) => {
  return sequelize.define("climate_zone_code", {
    climatezone_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    province_code: {
      type: Sequelize.STRING
    },
    altitude_code: {
      type: Sequelize.STRING
    },
    climate_zone: {
      type: Sequelize.STRING
    },
    country_code: {
      type: Sequelize.STRING
    },
    climate_code: {
      type: Sequelize.STRING
    }
  },  {schema: 'release', timestamps: false, tableName: 'climate_zone_code'});
};
