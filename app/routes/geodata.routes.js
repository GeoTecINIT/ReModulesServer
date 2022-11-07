module.exports = app => {
  const category = require("../controllers/building.controller");
  const router = require("express").Router();

  router.get( '/year/:year', category.getYearCode);
  router.get( '/year/:year/country/:country/zone/:zone/category/:category', category.getTypologyCode);
  router.get( '/altitude/country/:country/climate/:climate/height/:height', category.getAltitude);
  router.get( '/climateSubZone/country/:country/climate/:climate/province/:province/altitude/:altitude', category.getClimateSubZone);
  router.get( '/climateZone/country/:country/climate/:climate', category.getClimateZone);
  app.use('/api/geoData', router);
};
