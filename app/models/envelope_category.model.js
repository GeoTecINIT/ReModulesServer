module.exports = (sequelize, Sequelize) => {
  return sequelize.define("envelope_category", {
    code: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    enveloped_code: {
      type: Sequelize.STRING
    },
    component_code: {
      type: Sequelize.STRING
    },
    category_pic_code: {
      type: Sequelize.STRING
    },
  }, {schema: 'release', timestamps: false, tableName: 'envelope_category'});
};
