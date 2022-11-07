module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_stops", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stop: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_stops'});
};
