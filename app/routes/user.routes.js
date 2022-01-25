module.exports = app => {
  const user = require("../controllers/user.controller.js");

  let router = require("express").Router();

  router.post("/", user.create);

  router.get("/", user.findAll);

  router.get("/:uid", user.findOne);

  router.put("/:uid", user.update);

  router.delete("/:uid", user.delete);

  router.post('/auth/google', user.loginGoogle);

  app.use('/api/user', router);
};
