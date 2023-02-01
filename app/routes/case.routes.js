module.exports = app => {
    const controller = require("../controllers/case.controller");
    const router = require('express').Router();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getId);

    app.use('/api/case', router);
};