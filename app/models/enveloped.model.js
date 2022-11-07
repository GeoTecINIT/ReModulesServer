module.exports = (sequelize, Sequelize) => {
  return sequelize.define("enveloped", {
    enveloped_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    country_code: {
      type: Sequelize.STRING
    },
    component_code: {
      type: Sequelize.STRING
    },
    year_code: {
      type: Sequelize.STRING
    },
    data_type: {
      type: Sequelize.INTEGER
    },
    construction_variant: {
      type: Sequelize.INTEGER
    },
    type_construction: {
      type: Sequelize.INTEGER
    },
    type_construction_original: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    original_description: {
      type: Sequelize.INTEGER
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
  }, {schema: 'release', timestamps: false, tableName: 'enveloped'});
};
