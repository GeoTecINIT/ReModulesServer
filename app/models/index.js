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
db.CeeBuilding = require("./cee_building.model.js")(sequelize, Sequelize);
db.UserBuilding = require("./user_building.model.js")(sequelize, Sequelize);
db.UserTool = require("./user_tool.model.js")(sequelize, Sequelize);
db.UserCEEBuilding = require("./user_cee_building.model.js")(sequelize, Sequelize);
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
db.Efficiency =  require("./efficiency.model")(sequelize, Sequelize);
db.ToolsApplications =  require("./tools_applications.model")(sequelize, Sequelize);
db.ToolsCountries =  require("./tools_countries.model")(sequelize, Sequelize);
db.ToolsProfiles =  require("./tools_profiles.model")(sequelize, Sequelize);
db.ToolsSolutions =  require("./tools_solutions.model")(sequelize, Sequelize);
db.ToolsSteps =  require("./tools_steps.model")(sequelize, Sequelize);
db.ToolsStops =  require("./tools_stops.model")(sequelize, Sequelize);
db.ToolsTypologies =  require("./tools_typologies.model")(sequelize, Sequelize);
db.ToolsCountriesApp =  require("./tools_countries_applications.model")(sequelize, Sequelize);
db.ToolsProfilesApp =  require("./tools_profiles_applications.model")(sequelize, Sequelize);
db.ToolsSolutionsApp =  require("./tools_solutions_applications.model")(sequelize, Sequelize);
db.ToolsStepsApp =  require("./tools_steps_applications.model")(sequelize, Sequelize);
db.ToolsStopsApp =  require("./tools_stops_applications.model")(sequelize, Sequelize);
db.ToolsTypologiesApp =  require("./tools_typologies_applications.model")(sequelize, Sequelize);


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

db.CeeBuilding.belongsToMany( db.User, {
  through: db.UserCEEBuilding,
  foreignKey: 'user_id',
  targetKey: 'uid'
});

db.User.belongsToMany( db.CeeBuilding, {
  through: db.UserCEEBuilding,
  foreignKey: 'cee_building_id',
  targetKey: 'id'
});
db.UserCEEBuilding.belongsTo( db.CeeBuilding, {
  foreignKey: 'cee_building_id'
});
db.UserCEEBuilding.belongsTo( db.User, {
  foreignKey: 'user_id'
});

db.ToolsApplications.belongsToMany( db.User, {
  through: db.UserTool,
  foreignKey: 'user_id',
  targetKey: 'uid'
});

db.User.belongsToMany( db.ToolsApplications, {
  through: db.UserTool,
  foreignKey: 'tool_id',
  targetKey: 'id'
});
db.UserTool.belongsTo( db.ToolsApplications, {
  foreignKey: 'tool_id'
});
db.UserTool.belongsTo( db.User, {
  foreignKey: 'user_id',
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

db.Efficiency.belongsTo(db.SystemMeasures, {
  foreignKey: 'code_system_measure',
});
db.Efficiency.belongsTo(db.CategoryPics, {
  foreignKey: 'category_pic_code'
});


db.ToolsApplications.belongsToMany( db.ToolsCountries, {
  through: db.ToolsCountriesApp,
  foreignKey: 'app_id',
  targetKey: 'id'
});
db.ToolsCountries.belongsToMany( db.ToolsApplications, {
  through: db.ToolsCountriesApp,
  foreignKey: 'country_id',
  targetKey: 'id'
});
db.ToolsCountriesApp.belongsTo( db.ToolsApplications, {
  foreignKey: 'app_id'
});
db.ToolsCountriesApp.belongsTo( db.ToolsCountries, {
  foreignKey: 'country_id'
});

db.ToolsApplications.belongsToMany( db.ToolsProfiles, {
  through: db.ToolsProfilesApp,
  foreignKey: 'app_id',
  targetKey: 'id'
});
db.ToolsProfiles.belongsToMany( db.ToolsApplications, {
  through: db.ToolsProfilesApp,
  foreignKey: 'profile_id',
  targetKey: 'id'
});
db.ToolsProfilesApp.belongsTo( db.ToolsApplications, {
  foreignKey: 'app_id'
});
db.ToolsProfilesApp.belongsTo( db.ToolsProfiles, {
  foreignKey: 'profile_id'
});

db.ToolsApplications.belongsToMany( db.ToolsSolutions, {
  through: db.ToolsSolutionsApp,
  foreignKey: 'app_id',
  targetKey: 'id'
});
db.ToolsSolutions.belongsToMany( db.ToolsApplications, {
  through: db.ToolsSolutionsApp,
  foreignKey: 'solution_id',
  targetKey: 'id'
});
db.ToolsSolutionsApp.belongsTo( db.ToolsApplications, {
  foreignKey: 'app_id'
});
db.ToolsSolutionsApp.belongsTo( db.ToolsSolutions, {
  foreignKey: 'solution_id'
});

db.ToolsApplications.belongsToMany( db.ToolsSteps, {
  through: db.ToolsStepsApp,
  foreignKey: 'app_id',
  targetKey: 'id'
});
db.ToolsSteps.belongsToMany( db.ToolsApplications, {
  through: db.ToolsStepsApp,
  foreignKey: 'step_id',
  targetKey: 'id'
});
db.ToolsStepsApp.belongsTo( db.ToolsApplications, {
  foreignKey: 'app_id'
});
db.ToolsStepsApp.belongsTo( db.ToolsSteps, {
  foreignKey: 'step_id'
});

db.ToolsApplications.belongsToMany( db.ToolsStops, {
  through: db.ToolsStopsApp,
  foreignKey: 'app_id',
  targetKey: 'id'
});
db.ToolsStops.belongsToMany( db.ToolsApplications, {
  through: db.ToolsStopsApp,
  foreignKey: 'stop_id',
  targetKey: 'id'
});
db.ToolsStopsApp.belongsTo( db.ToolsApplications, {
  foreignKey: 'app_id'
});
db.ToolsStopsApp.belongsTo( db.ToolsStops, {
  foreignKey: 'stop_id'
});

db.ToolsApplications.belongsToMany( db.ToolsTypologies, {
  through: db.ToolsTypologiesApp,
  foreignKey: 'app_id',
  targetKey: 'id'
});
db.ToolsTypologies.belongsToMany( db.ToolsApplications, {
  through: db.ToolsTypologiesApp,
  foreignKey: 'typology_id',
  targetKey: 'id'
});
db.ToolsTypologiesApp.belongsTo( db.ToolsApplications, {
  foreignKey: 'app_id'
});
db.ToolsTypologiesApp.belongsTo( db.ToolsTypologies, {
  foreignKey: 'typology_id'
});
module.exports = db;
