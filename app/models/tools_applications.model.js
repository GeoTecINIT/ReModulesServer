module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tools_applications", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login_access: {
      type: Sequelize.BOOLEAN
    },
    image: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    short_description: {
      type: Sequelize.STRING
    },
    long_description: {
      type: Sequelize.STRING
    },
    wurl: {
      type: Sequelize.BOOLEAN
    },
    name: {
      type: Sequelize.STRING
    }
  }, {schema: 'release', timestamps: false, tableName: 'tools_applications'});
};
