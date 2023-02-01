module.exports = app => {
    const controller = require("../controllers/cee_building.controller");
    const router = require('express').Router();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getId);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    app.use('/api/cee_building', router);
};