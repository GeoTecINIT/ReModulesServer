module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user_tool", {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'user',
          key: 'uid'
        }
      },
      tool_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tools_applications',
          key: 'id'
        }
      }
    }, {schema: 'release', timestamps: false, tableName: 'user_tool'});
  };