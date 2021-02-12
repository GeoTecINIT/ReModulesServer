module.exports = app => {
  const category = require("../controllers/category.controller.js");

  var router = require("express").Router();

  router.get("/pics/year/:year/country/:country/zone/:zone", category.getPics);

  app.use('/api/category', router);
};
