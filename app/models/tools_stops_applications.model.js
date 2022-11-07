module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_stops_applications", {
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
    stop_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tools_stops',
        key: 'id'
      }
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_stops_applications'});
};
