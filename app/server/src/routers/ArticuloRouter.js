const express = require('express');
const ArticuloController = require('../controllers/ArticuloController');

const Router = express.Router(); 

Router

    .get('/',ArticuloController.show)
    .post('/',ArticuloController.create)
    .delete('/:id',ArticuloController.remove)
    .put('/:id', ArticuloController.modify)


module.exports = Router;