module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user_building_score_chart", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score_chart_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'score_charts',
        key: 'score_chart_code'
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
  }, {schema: 'public', timestamps: false, tableName: 'user_building_score_chart'});
};
