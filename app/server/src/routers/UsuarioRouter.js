const express = require('express');
const userController = require('../controllers/UsuarioController');

const Router = express.Router(); 

Router

    .get('/',userController.show)
    .post('/',userController.create)
    .delete('/:id',userController.delete)
    .put('/:id_usuario',userController.modify)
    .get('/datos/:rut',userController.data)


module.exports = Router;