const express = require('express');
const RolController = require('../controllers/RolController');

const Router = express.Router(); 

Router
    .get('/',RolController.show)

module.exports = Router;