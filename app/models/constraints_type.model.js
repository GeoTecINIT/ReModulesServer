module.exports = (sequelize, Sequelize) => {
    return sequelize.define("constraints_type", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      constraint_type: {
        type: Sequelize.STRING
      }
    }, {schema: 'release', timestamps: false, tableName: 'constraints_type'});
  };