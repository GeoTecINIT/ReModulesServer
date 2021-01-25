module.exports = (sequelize, Sequelize) => {
  const UserEstate = sequelize.define("user_estate", {
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    id_estate: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'estate',
        key: 'id'
      }
    }
  }, {schema: 'auxiliary'});

  return UserEstate;
};
