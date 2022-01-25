module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user_building", {
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
    building_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'building',
        key: 'id'
      }
    },
    year: {
      type: Sequelize.STRING
    },
    year_code: {
      type: Sequelize.STRING
    },
    typology_code: {
      type: Sequelize.STRING
    },
    typology_name: {
      type: Sequelize.STRING
    },
    building_code: {
      type: Sequelize.STRING
    },

  }, {schema: 'public', timestamps: false, tableName: 'user_building'});
};
