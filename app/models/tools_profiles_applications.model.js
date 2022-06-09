module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_profiles_applications", {
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
    profile_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tools_profiles',
        key: 'id'
      }
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_profiles_applications'});
};
