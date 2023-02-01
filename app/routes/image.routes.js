module.exports = app => {
    const controller = require("../controllers/image.controller");
    const router = require('express').Router();

    const  multipart  =  require('connect-multiparty');
    const  multipartMiddleware  =  multipart({ uploadDir:  './uploads/imagesTestimony' });

    router.get('/', controller.getAll);
    router.get('/:id', controller.getId);
    router.post('/', multipartMiddleware, controller.create);
    //router.put('/:id', controller.update);
    //router.delete('/:id', controller.delete);

    app.use('/api/image', router);
};