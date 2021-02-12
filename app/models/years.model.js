module.exports = (sequelize, Sequelize) => {
  return sequelize.define("years", {
    year_code: {
      type: Sequelize.STRING,
      primaryKey: true
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
  }, {schema: 'public', timestamps: false});
};
