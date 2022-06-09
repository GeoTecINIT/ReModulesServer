module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_countries_application", {
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
    country_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'tools_countries',
        key: 'id'
      }
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_countries_application'});
};
