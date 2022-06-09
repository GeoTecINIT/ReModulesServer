module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_steps_applications", {
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
    step_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tools_steps',
        key: 'id'
      }
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_steps_applications'});
};
