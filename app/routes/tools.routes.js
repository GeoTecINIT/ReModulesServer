const controller = require("../controllers/tools.controller");
module.exports = app => {
  const controller = require("../controllers/tools.controller");
  const router = require("express").Router();

  router.get( '/', controller.getTools);
  router.post('/', controller.create);
  router.get( '/filters', controller.buildFilters);
  router.get('/profiles', controller.getProfiles);
  router.get('/constraints_type', controller.getContraintsTypes);
  router.get('/stops', controller.getStops);
  router.get('/steps', controller.getSteps);
  router.get('/solutions', controller.getSolutions);
  router.get('/typologies', controller.getTypologies);
  router.get('/constraints_category', controller.getContraintsCategory);
  app.use('/api/tools', router);
};
