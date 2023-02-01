module.exports = app => {
    const controller = require("../controllers/qualification.controller");
    const router = require('express').Router();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getId);

    app.use('/api/qualification', router);
};