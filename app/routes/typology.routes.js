module.exports = app => {
  const category = require("../controllers/energy_efficiency.controller.js");
  const router = require("express").Router();

  router.get("/pics/year/:year/country/:country/zone/:zone", category.getPics);
  router.get("/envelope/year/:year/country/:country/zone/:zone/category/:category", category.getEnvelope);
  router.get("/system/year/:year/country/:country/zone/:zone/building/:building", category.getSystem);
  router.get( '/year/:year', category.getYearCode);
  router.get( '/code/:code', category.getBuildingCode);
  router.get( '/altitude/country/:country/climate/:climate/height/:height', category.getAltitude);
  router.get( '/climateSubZone/country/:country/climate/:climate/province/:province/altitude/:altitude', category.getClimateSubZone);
  app.use('/api/typology', router);
};
