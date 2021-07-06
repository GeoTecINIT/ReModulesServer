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
db.Roles = require("./roles.model")(sequelize, Sequelize);
db.UserRole = require("./user_role.model")(sequelize, Sequelize);
db.Building = require("./building.model.js")(sequelize, Sequelize);
db.UserBuilding = require("./user_building.model.js")(sequelize, Sequelize);
db.CategoryPics = require("./category_pics.model")(sequelize, Sequelize);
db.Category = require("./category.model")(sequelize, Sequelize);
db.Years = require("./years.model")(sequelize, Sequelize);
db.Enveloped = require("./enveloped.model")(sequelize, Sequelize);
db.EnvelopeCategory = require("./envelope_category.model")(sequelize, Sequelize);
db.ComponentType = require("./component_type.model")(sequelize, Sequelize);
db.Altitude = require("./altitude.model")(sequelize, Sequelize);
db.CliZoneCode = require("./climate_zone_code.model")(sequelize, Sequelize);
db.EnergyScore = require("./energy_score.model")(sequelize, Sequelize);
db.ScoreChart = require("./score_charts.model")(sequelize, Sequelize);
db.ClimateZone = require("./climate_zone.model")(sequelize, Sequelize);
db.Measures = require("./measures.model")(sequelize, Sequelize);
db.MeasuresBuilding = require("./measures_building.model")(sequelize, Sequelize);
db.ImprovingBuilding = require("./improving_buildings.model")(sequelize, Sequelize);
db.SystemTypes =  require("./system_types.model")(sequelize, Sequelize);
db.SystemMeasures =  require("./system_measures.model")(sequelize, Sequelize);
db.HeatingSystem =  require("./heating_system.model")(sequelize, Sequelize);
db.WaterSystem =  require("./water_system.model")(sequelize, Sequelize);
db.VentilationSystem =  require("./ventilation_system.model")(sequelize, Sequelize);


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
db.CategoryPics.belongsTo(db.ClimateZone, {
  foreignKey: 'climate_code'
});

db.EnvelopeCategory.belongsTo(db.Enveloped, {
  foreignKey: 'enveloped_code'
});
db.EnvelopeCategory.belongsTo(db.ComponentType, {
  foreignKey: 'component_code'
});
db.EnvelopeCategory.belongsTo(db.CategoryPics, {
  foreignKey: 'component_code'
});

db.Measures.belongsTo(db.ComponentType, {
  foreignKey: 'component_code'
});
db.ImprovingBuilding.belongsTo(db.CategoryPics, {
  foreignKey: 'category_pic_code'
});
db.MeasuresBuilding.belongsTo(db.ImprovingBuilding, {
  foreignKey: 'building_variant_code'
});
db.MeasuresBuilding.belongsTo(db.Measures, {
  foreignKey: 'measure_code'
});
db.MeasuresBuilding.belongsTo(db.CategoryPics, {
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


db.Roles.belongsToMany( db.User, {
  through: db.UserRole,
  foreignKey: 'role_id',
  targetKey: 'uid'
});

db.User.belongsToMany( db.Roles, {
  through: db.UserRole,
  foreignKey: 'user_id',
  targetKey: 'id'
});
db.UserRole.belongsTo( db.Roles, {
  foreignKey: 'role_id'
});
db.UserRole.belongsTo( db.User, {
  foreignKey: 'user_id'
});

db.SystemTypes.belongsTo(db.SystemMeasures, {
  foreignKey: 'code_system_measure'
});
db.SystemTypes.belongsTo(db.WaterSystem, {
  foreignKey: 'water_system',
  as: 'water'
});
db.SystemTypes.belongsTo(db.HeatingSystem, {
  foreignKey: 'heating_system',
  as: 'heating'
});
db.SystemTypes.belongsTo(db.VentilationSystem, {
  foreignKey: 'ventilation_system',
  as: 'ventilation'
});
db.SystemTypes.belongsTo(db.CategoryPics, {
  foreignKey: 'category_pic_code'
});

module.exports = db;
