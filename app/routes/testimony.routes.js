module.exports = app => {
    const controller = require("../controllers/testimony.controller");
    const router = require('express').Router();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getId);
    router.post('/', controller.create);
    router.put('/', controller.update);
    router.delete('/:id', controller.delete);

    router.get('/idDwelling/:id', controller.getIdDwelling);

    app.use('/api/testimony', router);
};


/*module.exports = app => {
    const controller = require("../controllers/testimony.controller");
    const router = require('express').Router();

    const  multipart  =  require('connect-multiparty');
    const  multipartMiddleware  =  multipart({ uploadDir:  './uploads/videoTestimony' });

    router.get('/', controller.getAll);
    router.get('/:id', controller.getId);
    router.post('/', multipartMiddleware, controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    app.use('/api/testimony', router);
};*/