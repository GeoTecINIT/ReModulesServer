module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user_building", {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'uid'
      }
    },
    building_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'building',
        key: 'id'
      }
    }
  }, {schema: 'release', timestamps: false, tableName: 'user_building'});
};
