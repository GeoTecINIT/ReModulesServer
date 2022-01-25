module.exports = (sequelize, Sequelize) => {
  return sequelize.define("role", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    }
  }, {schema: 'public', timestamps: false, tableName: 'roles'});
};
