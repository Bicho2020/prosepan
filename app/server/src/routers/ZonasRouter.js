const express = require('express');
const ZonaController = require('../controllers/ZonasController');

const Router = express.Router(); 

Router

    .get('/',ZonaController.show)
    .post('/',ZonaController.create)
    .delete('/:id',ZonaController.remove)
    .put('/:id', ZonaController.update)


module.exports = Router;