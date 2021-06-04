module.exports = (sequelize, Sequelize) => {
  return sequelize.define("category_pics", {
    category_pic_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.DECIMAL
    },
    add_parameter: {
      type: Sequelize.STRING
    },
    data_type: {
      type: Sequelize.STRING
    },
    country_code: {
      type: Sequelize.DECIMAL
    },
    climate_code: {
      type: Sequelize.STRING
    },
    year_code: {
      type: Sequelize.STRING
    },
    category_code: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false});
};
