module.exports = (sequelize, Sequelize) => {
  return sequelize.define("system_types", {
    system_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    category_pic_code: {
      type: Sequelize.STRING
    },
    building_variant_code: {
      type: Sequelize.STRING
    },
    code_system_measure: {
      type: Sequelize.STRING
    },
    level_improvement: {
      type: Sequelize.STRING
    },
    code_system_type: {
      type: Sequelize.STRING
    },
    heating_system: {
      type: Sequelize.STRING
    },
    water_system: {
      type: Sequelize.STRING
    },
    ventilation_system: {
      type: Sequelize.STRING
    },
    pv_system: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false, tableName: 'system_types'});
};
