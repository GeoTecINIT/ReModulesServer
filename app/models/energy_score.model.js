module.exports = (sequelize, Sequelize) => {
  return sequelize.define("energy_score", {
    energy_score_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    country_code: {
      type: Sequelize.STRING
    },
    climate_code: {
      type: Sequelize.STRING
    },
    category_code: {
      type: Sequelize.STRING
    },
    year_code: {
      type: Sequelize.STRING
    },
    climate_zone: {
      type: Sequelize.STRING
    },
    emission_ranking: {
      type: Sequelize.STRING
    },
    consumption_ranking: {
      type: Sequelize.STRING
    }
  },  {schema: 'public', timestamps: false, tableName: 'energy_score'});
};
