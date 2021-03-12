module.exports = (sequelize, Sequelize) => {
  return sequelize.define("system_type", {
    id_system_type: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    country_code: {
      type: Sequelize.STRING
    },
    climate_code: {
      type: Sequelize.STRING
    },
    year_code: {
      type: Sequelize.STRING
    },
    building_code: {
      type: Sequelize.STRING
    },
    system_type: {
      type: Sequelize.STRING
    },
    system_code: {
      type: Sequelize.STRING
    }
  }, {schema: 'public', timestamps: false, tableName: 'system_type'});
};
