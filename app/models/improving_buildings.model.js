module.exports = (sequelize, Sequelize) => {
  return sequelize.define("improving_buildings", {
    building_variant_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    country_code: {
      type: Sequelize.STRING
    },
    category_pic_code: {
      type: Sequelize.STRING
    },
    number_building_variant: {
      type: Sequelize.STRING
    },
    level_improvement: {
      type: Sequelize.STRING
    },
    type_variant: {
      type: Sequelize.STRING
    },
    building_variant_description: {
      type: Sequelize.STRING
    },
    building_variant_description_original: {
      type: Sequelize.STRING
    },
  }, {schema: 'release', timestamps: false, tableName: 'improving_buildings'});
};
