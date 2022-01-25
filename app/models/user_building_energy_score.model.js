module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user_building_energy_score", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    energy_score_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'energy_score',
        key: 'energy_score_code'
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
  }, {schema: 'public', timestamps: false, tableName: 'user_building_energy_score'});
};
