module.exports = (sequelize, Sequelize) => {
  return sequelize.define("system_code", {
    system_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    description_system: {
      type: Sequelize.STRING
    },
    system_type: {
      type: Sequelize.STRING
    },
    pictures: {
      type: Sequelize.STRING
    }
  }, {schema: 'public', timestamps: false, tableName: 'system_code'});
};
