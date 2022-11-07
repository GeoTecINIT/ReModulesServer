module.exports = (sequelize, Sequelize) => {
  return sequelize.define("measures", {
    measure_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    country_code: {
      type: Sequelize.STRING
    },
    component_code: {
      type: Sequelize.STRING
    },
    measure_type: {
      type: Sequelize.STRING
    },
    variant_measure_type: {
      type: Sequelize.STRING
    },
    description_measure_type: {
      type: Sequelize.STRING
    },
    description_measure_type_original: {
      type: Sequelize.STRING
    },
    picture: {
      type: Sequelize.STRING
    },
    u_value: {
      type: Sequelize.DECIMAL
    },
  }, {schema: 'release', timestamps: false, tableName: 'measures'});
};
