module.exports = app => {
    const controller = require("../controllers/user_cee_building.controller");
    const router = require('express').Router();

    const  multipart  =  require('connect-multiparty');
    const  multipartMiddleware  =  multipart();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getId);
    router.post('/', controller.create);
    router.delete('/:id', controller.delete);

    router.get('/userId/:userId', controller.getIdUser);
    router.post('/delete/deleteIdUserIdCeeBuilding', multipartMiddleware, controller.deleteIdUserIdCeeBuilding);


    app.use('/api/user_cee_building', router);
};