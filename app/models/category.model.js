module.exports = (sequelize, Sequelize) => {
  return sequelize.define("category", {
    category_code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  }, {schema: 'public', timestamps: false});
};
