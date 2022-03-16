const {authJwt} = require("../validation");
const user = require("../controllers/userEstate.controller");
module.exports = app => {
  const user = require("../controllers/userEstate.controller.js");

  var router = require("express").Router();

  router.post("/", authJwt.verifyToken, user.addBuildingToUser);
  router.get("/buildings", authJwt.verifyToken, user.getBuildings);
  router.get("/favorite/address/:address", authJwt.verifyToken, user.isFavorite);
  router.put("/", authJwt.verifyToken, user.updateBuildingUser);
  router.delete("/building/:building", authJwt.verifyToken, user.deleteBuildingUser);

  app.use('/api/history', router);
};
