module.exports = (sequelize, Sequelize) => {
  return sequelize.define("enveloped", {
    enveloped_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    country_code: {
      type: Sequelize.STRING
    },
    climate_code: {
      type: Sequelize.STRING
    },
    component_code: {
      type: Sequelize.STRING
    },
    year_code: {
      type: Sequelize.STRING
    },
    construction_variant: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    picture: {
      type: Sequelize.STRING
    },
    u_value: {
      type: Sequelize.INTEGER
    },
    area: {
      type: Sequelize.INTEGER
    }
  }, {schema: 'public', timestamps: false, tableName: 'enveloped'});
};
