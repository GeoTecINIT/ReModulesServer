const { authJwt } = require("../validation");
const user = require("../controllers/user.controller.js");

let router = require("express").Router();

module.exports = app => {

  router.post("/", user.create);

  router.get("/", authJwt.verifyToken, user.findAll);

  router.get("/:uid", user.findOne);

  router.put("/:uid", user.update);

  router.delete("/:uid", user.delete);

  router.post('/token', user.generateToken);

  app.use('/api/user', router, (req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    if (req.method === 'GET') {
      res.set('Cache-control', `no-store`)
    }
    next();
  });
};
