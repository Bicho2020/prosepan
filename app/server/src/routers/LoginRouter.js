const express = require('express');
const ArticuloController = require('../controllers/LoginController');

const Router = express.Router(); 

Router

    .post('/sign-up',ArticuloController.signup)



module.exports = Router;