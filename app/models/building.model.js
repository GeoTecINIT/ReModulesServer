module.exports = (sequelize, Sequelize) => {
  return sequelize.define("building", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: Sequelize.STRING
    },
    altitude: {
      type: Sequelize.STRING
    },
    climate_zone: {
      type: Sequelize.STRING
    },
    climate_sub_zone: {
      type: Sequelize.STRING
    },
    coordinates: {
      type: Sequelize.JSON
    },
    country: {
      type: Sequelize.STRING
    },
    point: {
      type: Sequelize.JSON
    },
    rc: {
      type: Sequelize.STRING
    },
    region: {
      type: Sequelize.STRING
    },
    surface: {
      type: Sequelize.INTEGER
    },
    building_code: {
      type: Sequelize.STRING
    },
    category_code: {
      type: Sequelize.STRING
    },
    category_pic_code: {
      type: Sequelize.STRING
    },
    use: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.INTEGER
    },
    year_code: {
      type: Sequelize.STRING
    },
    code_system_measure: {
      type: Sequelize.STRING
    },
    category_name: {
      type: Sequelize.STRING
    },
    pic_name: {
      type: Sequelize.STRING
    }
  }, {schema: 'release',  timestamps: false, tableName: 'building'});
};
