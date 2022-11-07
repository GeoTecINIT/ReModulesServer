const {authJwt} = require("../validation");
const user = require("../controllers/userEstate.controller");
module.exports = app => {
  const user = require("../controllers/userEstate.controller.js");

  var router = require("express").Router();
  
  router.post("/", authJwt.verifyToken, user.addBuildingToUser);
  router.post("/cee", authJwt.verifyToken, user.addBuildingCEEToUser);
  router.post("/tools", authJwt.verifyToken, user.addUserTool);
  router.get("/tools", authJwt.verifyToken, user.getTools);
  router.get("/buildings", authJwt.verifyToken, user.getBuildings);
  router.get("/cee", authJwt.verifyToken, user.getCEEBuildings);
  router.get("/favorite/address/:address", authJwt.verifyToken, user.isFavorite);
  router.get("/favorite/name/:name", authJwt.verifyToken, user.isFavorite2);
  router.put("/", authJwt.verifyToken, user.updateBuildingUser);
  router.delete("/building/:building", authJwt.verifyToken, user.deleteBuildingUser);
  router.delete("/tools/:tool", authJwt.verifyToken, user.deleteToolUser);

  app.use('/api/history', router);
};
