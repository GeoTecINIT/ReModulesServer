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
db.Building = require("./building.model.js")(sequelize, Sequelize);
db.UserBuilding = require("./user_building.model.js")(sequelize, Sequelize);
db.CategoryPics = require("./category_pics.model")(sequelize, Sequelize);
db.Category = require("./category.model")(sequelize, Sequelize);
db.Years = require("./years.model")(sequelize, Sequelize);
db.Enveloped = require("./enveloped.model")(sequelize, Sequelize);
db.EnvelopeCategory = require("./envelope_category.model")(sequelize, Sequelize);
db.ComponentType = require("./component_type.model")(sequelize, Sequelize);
db.SystemCode = require("./system_code.model")(sequelize, Sequelize);
db.SystemType = require("./system_type.model")(sequelize, Sequelize);
db.Altitude = require("./altitude.model")(sequelize, Sequelize);
db.CliZoneCode = require("./climate_zone_code.model")(sequelize, Sequelize);
db.EnergyScore = require("./energy_score.model")(sequelize, Sequelize);
db.ScoreChart = require("./score_charts.model")(sequelize, Sequelize);

db.UserBuildingEnveloped = require("./user_building_enveloped.model")(sequelize, Sequelize);
db.UserBuildingSystem = require("./user_building_system.model")(sequelize, Sequelize);
db.UserBuildingEnergyScore = require("./user_building_energy_score.model")(sequelize, Sequelize);
db.UserBuildingScoreChart = require("./user_building_score_chart.model")(sequelize, Sequelize);


db.Building.belongsToMany( db.User, {
  through: db.UserBuilding,
  foreignKey: 'building_id',
  targetKey: 'uid'
});

db.User.belongsToMany( db.Building, {
  through: db.UserBuilding,
  foreignKey: 'user_id',
  targetKey: 'id'
});
db.UserBuilding.belongsTo( db.Building, {
  foreignKey: 'building_id'
});
db.UserBuilding.belongsTo( db.User, {
  foreignKey: 'user_id'
});

db.CategoryPics.belongsTo(db.Years, {
  foreignKey: 'year_code'
});
db.CategoryPics.belongsTo(db.Category, {
  foreignKey: 'category_code'
});

db.EnvelopeCategory.belongsTo(db.Enveloped, {
  foreignKey: 'enveloped_code'
});
db.EnvelopeCategory.belongsTo(db.ComponentType, {
  foreignKey: 'component_code'
});


db.UserBuilding.belongsToMany( db.Enveloped, {
  through: db.UserBuildingEnveloped,
  foreignKey: 'building_id',
  targetKey: 'enveloped_code'
});
db.Enveloped.belongsToMany( db.UserBuilding, {
  through: db.UserBuildingEnveloped,
  foreignKey: 'enveloped_id',
  targetKey: 'id'
});

db.UserBuilding.belongsToMany( db.SystemCode, {
  through: db.UserBuildingSystem,
  foreignKey: 'building_id',
  targetKey: 'system_code'
});
db.SystemCode.belongsToMany( db.UserBuilding, {
  through: db.UserBuildingSystem,
  foreignKey: 'system_id',
  targetKey: 'building_id'
});

db.UserBuilding.belongsToMany( db.EnergyScore, {
  through: db.UserBuildingEnergyScore,
  foreignKey: 'building_id',
  targetKey: 'energy_score_code'
});
db.EnergyScore.belongsToMany( db.UserBuilding, {
  through: db.UserBuildingEnergyScore,
  foreignKey: 'energy_score_id',
  targetKey: 'id'
});

db.UserBuilding.belongsToMany( db.ScoreChart, {
  through: db.UserBuildingScoreChart,
  foreignKey: 'building_id',
  targetKey: 'score_chart_code'
});
db.ScoreChart.belongsToMany( db.UserBuilding, {
  through: db.UserBuildingScoreChart,
  foreignKey: 'score_chart_id',
  targetKey: 'building_id'
});


db.SystemType.belongsTo(db.SystemCode, {
  foreignKey: 'system_code',
  as: 'System_code'
});

module.exports = db;
