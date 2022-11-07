module.exports = (sequelize, Sequelize) => {
  return sequelize.define("years", {
    id_year: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    year_code: {
      type: Sequelize.STRING,
    },
    first_year: {
      type: Sequelize.DECIMAL
    },
    last_year: {
      type: Sequelize.DECIMAL
    },
    country_code: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false});
};
