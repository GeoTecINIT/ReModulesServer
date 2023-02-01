module.exports = app => {
    const controller = require("../controllers/file.controller");
    const router = require('express').Router();

    const  multipart  =  require('connect-multiparty');
    const  multipartMiddleware  =  multipart({ uploadDir:  './uploads/filesMonitoring' });

    router.get('/', controller.getAll);
    router.get('/:id', controller.getId);
    router.post('/', multipartMiddleware, controller.upload)

    app.use('/api/file', router);
};