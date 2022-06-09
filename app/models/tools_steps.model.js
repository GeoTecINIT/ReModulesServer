module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_steps", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    step: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_steps'});
};
