module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user_building_enveloped", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enveloped_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'enveloped',
        key: 'enveloped_code'
      }
    },
    building_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user_building',
        key: 'id'
      }
    }
  }, {schema: 'public', timestamps: false, tableName: 'user_building_enveloped'});
};
