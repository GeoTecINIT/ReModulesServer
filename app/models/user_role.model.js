module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user_role", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'uid'
      }
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    }
  }, {schema: 'public', timestamps: false, tableName: 'user_role'});
};
