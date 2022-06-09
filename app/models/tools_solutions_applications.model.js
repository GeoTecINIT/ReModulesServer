module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_solutions_applications", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    app_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tools_applications',
        key: 'id'
      }
    },
    solution_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tools_solutions',
        key: 'id'
      }
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_solutions_applications'});
};
