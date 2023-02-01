module.exports = app => {
    const controller = require("../controllers/tipology.controller");
    const router = require('express').Router();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getId);

    app.use('/api/tipology', router);
};