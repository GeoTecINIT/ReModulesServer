module.exports = app => {
  const user = require("../controllers/userEstate.controller.js");

  var router = require("express").Router();

  router.post("/", user.create);

  router.get("/:id", user.findHistoryByUser);

  app.use('/api/history', router);
};
