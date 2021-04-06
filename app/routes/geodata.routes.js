module.exports = app => {
  const category = require("../controllers/building.controller");
  const router = require("express").Router();

  router.get( '/year/:year', category.getYearCode);
  router.get( '/code/:code', category.getBuildingCode);
  router.get( '/altitude/country/:country/climate/:climate/height/:height', category.getAltitude);
  router.get( '/climateSubZone/country/:country/climate/:climate/province/:province/altitude/:altitude', category.getClimateSubZone);
  app.use('/api/geoData', router);
};
