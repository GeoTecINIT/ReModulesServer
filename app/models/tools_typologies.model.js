module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_typologies", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    typology: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_typologies'});
};
