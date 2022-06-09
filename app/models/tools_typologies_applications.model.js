module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_typologies_applications", {
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
    typology_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tools_typologies',
        key: 'id'
      }
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_typologies_applications'});
};
