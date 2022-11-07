module.exports = app => {
  const category = require("../controllers/energy_efficiency.controller.js");
  const router = require("express").Router();

  router.get("/pics/year/:year/country/:country/zone/:zone", category.getPics);
  router.get("/envelope/country/:country/category/:category", category.getEnvelope);
  router.get("/system/category_pic_code/:category_pic_code", category.getSystem);
  router.get("/energyScore/category_pic_code/:category_pic_code", category.getEnergyScore);
  router.get("/refurbishment/enveloped/category_pic_code/:category_pic_code", category.getEnvelopeRefurbishment);
  router.get("/refurbishment/systems/category_pic_code/:category_pic_code/system_measure/:system_measure", category.getSystemRefurbishment);
  router.get("/refurbishment/efficiency/category_pic_code/:category_pic_code/system_measure/:system_measure", category.getEfficiency);
  app.use('/api/typology', router);
};
