module.exports = app => {
  const user = require("../controllers/userEstate.controller.js");

  var router = require("express").Router();

  router.post("/", user.create);

  router.get("/", user.findAllHistory);

  router.get("/user/:id", user.findHistoryByUser);

  router.get("/uses/", user.getUses);

  router.delete("/prop/:rc/user/:user", user.deletePropFromHistory);

  router.get("/address/:address", user.getBuildingByAddress);

  app.use('/api/history', router);
};
