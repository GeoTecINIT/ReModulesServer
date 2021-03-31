module.exports = (sequelize, Sequelize) => {
  return sequelize.define("score_charts", {
    score_chart_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    energy_score_code: {
      type: Sequelize.STRING
    },
    demand: {
      type: Sequelize.DECIMAL
    },
    final_energy: {
      type: Sequelize.DECIMAL
    },
    primary_energy: {
      type: Sequelize.DECIMAL
    },
    emissions: {
      type: Sequelize.DECIMAL
    },
    system: {
      type: Sequelize.STRING
    }
  },  {schema: 'public', timestamps: false, tableName: 'score_charts'});
};
