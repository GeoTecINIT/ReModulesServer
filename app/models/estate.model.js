module.exports = (sequelize, Sequelize) => {
  return sequelize.define("estates", {
    rc: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    address: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.DECIMAL
    },
    lng: {
      type: Sequelize.DECIMAL
    },
    year: {
      type: Sequelize.INTEGER
    },
    use: {
      type: Sequelize.STRING
    },
    surface: {
      type: Sequelize.DECIMAL
    },
    country: {
      type: Sequelize.STRING
    },
    climate_zone: {
      type: Sequelize.STRING
    }
  }, {schema: 'auxiliary'});
};
