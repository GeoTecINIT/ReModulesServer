module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user_building_system", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    system_id: {
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
  }, {schema: 'public', timestamps: false, tableName: 'user_building_system'});
};
