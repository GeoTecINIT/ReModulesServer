module.exports = app => {
  const category = require("../controllers/category.controller.js");
  const router = require("express").Router();

  router.get("/pics/year/:year/country/:country/zone/:zone", category.getPics);
  router.get("/envelope/year/:year/country/:country/zone/:zone/category/:category", category.getEnvelope);
  router.get("/system/year/:year/country/:country/zone/:zone/building/:building", category.getSystem);

  app.use('/api/typology', router);
};
