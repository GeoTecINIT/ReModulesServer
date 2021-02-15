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
db.CategoryPics = require("./category_pics.model")(sequelize, Sequelize);
db.Category = require("./category.model")(sequelize, Sequelize);
db.Years = require("./years.model")(sequelize, Sequelize);

db.Estate.belongsToMany( db.User, {
  through: db.UserEstate,
  as: 'users',
  foreignKey: 'id_estate',
  targetKey: 'uid'
});

db.User.belongsToMany( db.Estate, {
  through: db.UserEstate,
  as: 'estates',
  foreignKey: 'id_user',
  targetKey: 'rc'
});

db.CategoryPics.belongsTo(db.Years, {
  foreignKey: 'year_code'
});

module.exports = db;
