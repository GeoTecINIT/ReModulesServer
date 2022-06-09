module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_solutions", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    solution: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_solutions'});
};
