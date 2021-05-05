const express = require('express');
const AreaController = require('../controllers/AreaController');

const Router = express.Router(); 

Router

    .get('/',AreaController.show)
    .post('/',AreaController.create)
    .delete('/:id',AreaController.remove)
    .put('/:id', AreaController.update)


module.exports = Router;