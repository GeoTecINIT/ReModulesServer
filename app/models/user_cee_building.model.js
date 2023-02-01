module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user_cee_building", {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'user',
          key: 'uid'
        }
      },
      cee_building_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cee_building',
          key: 'id'
        }
      }
    }, {schema: 'release', timestamps: false, tableName: 'user_cee_building'});
  };