module.exports = (sequelize, Sequelize) => {
  return sequelize.define("building", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rc: {
      type: Sequelize.STRING
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
    },
    climate_sub_zone: {
      type: Sequelize.STRING
    },
    province_name: {
      type: Sequelize.STRING
    },
    province_code: {
      type: Sequelize.STRING
    },
    altitude_code: {
      type: Sequelize.STRING
    },
    x: {
      type: Sequelize.DECIMAL
    },
    y: {
      type: Sequelize.DECIMAL
    },
  }, {schema: 'public',  timestamps: false, tableName: 'building'});
};
