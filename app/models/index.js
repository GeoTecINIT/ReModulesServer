const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, Sequelize);
db.Estate = require("./estate.model.js")(sequelize, Sequelize);
db.UserEstate = require("./user_estate.model.js")(sequelize, Sequelize);

db.Estate.belongsToMany( db.User, {
  through: 'user_estates',
  as: 'users',
  foreignKey: 'id_estate',
  targetKey: 'id'
});

db.User.belongsToMany( db.Estate, {
  through: 'user_estates',
  as: 'estates',
  foreignKey: 'id_user',
  targetKey: 'id'
});

module.exports = db;