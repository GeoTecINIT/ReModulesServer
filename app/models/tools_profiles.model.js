module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_profiles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    profile: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_profiles'});
};
