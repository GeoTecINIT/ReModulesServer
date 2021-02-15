module.exports = (sequelize, Sequelize) => {
  const UserEstate = sequelize.define("user_estates", {
    id_user: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'uid'
      }
    },
    id_estate: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'estate',
        key: 'rc'
      }
    }
  }, {schema: 'auxiliary'});

  return UserEstate;
};
