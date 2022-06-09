module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_countries", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_countries'});
};
