module.exports = (sequelize, Sequelize) => {
  return sequelize.define("measures_building", {
    measures_building_code: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    building_variant_code: {
      type: Sequelize.STRING
    },
    component_code: {
      type: Sequelize.STRING
    },
    measure_code: {
      type: Sequelize.STRING
    },
  }, {schema: 'release', timestamps: false, tableName: 'measures_building'});
};
