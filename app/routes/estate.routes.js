module.exports = app => {
  const user = require("../controllers/userEstate.controller.js");

  var router = require("express").Router();

  router.post("/", user.create);

  router.get("/user/:id", user.findHistoryByUser);

  router.get("/uses/", user.getUses);

  app.use('/api/history', router);
};
