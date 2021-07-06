module.exports = app => {
  const category = require("../controllers/energy_efficiency.controller.js");
  const router = require("express").Router();

  router.get("/pics/year/:year/country/:country/zone/:zone", category.getPics);
  router.get("/envelope/country/:country/category/:category", category.getEnvelope);
  router.get("/system/category_pic_code/:category_pic_code", category.getSystem);
  router.get("/energyScore/year_code/:year_code/country/:country/climate_code/:climate_code/climate_zone/:climate_zone/category_code/:category_code", category.getEnergyScore);
  router.get("/scoreChart/energy_score/:energy_score", category.getScoreChart);
  router.get("/refurbishment/category_pic_code/:category_pic_code", category.getRefurbishment);
  app.use('/api/typology', router);
};
