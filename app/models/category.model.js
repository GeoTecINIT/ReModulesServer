module.exports = (sequelize, Sequelize) => {
  return sequelize.define("category", {
    category_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    building_code: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false, tableName: 'category'});
};
