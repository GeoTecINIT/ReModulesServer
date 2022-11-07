module.exports = (sequelize, Sequelize) => {
  return sequelize.define("system_measures", {
    code_system_measure: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    description_actual_conditions: {
      type: Sequelize.STRING
    },
    original_description_aconditions: {
      type: Sequelize.STRING
    },
    description_standard: {
      type: Sequelize.STRING
    },
    original_description_standard: {
      type: Sequelize.STRING
    },
    description_advanced: {
      type: Sequelize.STRING
    },
    original_description_advanced: {
      type: Sequelize.STRING
    },
  }, {schema: 'release', timestamps: false, tableName: 'system_measures'});
};
