const express = require('express');
const SalaController = require('../controllers/SalaController');

const Router = express.Router(); 

Router

    .get('/',SalaController.show)
    .post('/',SalaController.create)
    .delete('/:id',SalaController.remove)
    .put('/:id',SalaController.update)
    .post('/asignacion/:id_usuario',SalaController.opdrag)
    .get('/asignacion/:id_usuario',SalaController.user_salas)
    .put('/asignacion/:tipo/:id_usuario/:id_sala',SalaController.change_opdrag)



module.exports = Router;