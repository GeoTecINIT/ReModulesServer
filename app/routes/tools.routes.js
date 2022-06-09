const controller = require("../controllers/tools.controller");
module.exports = app => {
  const controller = require("../controllers/tools.controller");
  const router = require("express").Router();

  router.get( '/', controller.getTools);
  router.get( '/filters', controller.buildFilters);
  app.use('/api/tools', router);
};
