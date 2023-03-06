module.exports = (sequelize, Sequelize) => {
    return sequelize.define("constraints_category", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      constraint_category: {
        type: Sequelize.STRING
      }
    }, {schema: 'release', timestamps: false, tableName: 'constraints_category'});
  };