module.exports = (sequelize, Sequelize) => {
  return sequelize.define("component_type", {
    component_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  }, {schema: 'public', timestamps: false, tableName: 'component_type'});
};
