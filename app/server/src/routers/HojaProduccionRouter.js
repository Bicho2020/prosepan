const express = require('express');
const HojaProduccionController = require('../controllers/HojaProduccionController');

const Router = express.Router(); 

Router
    .post('/ifyh/:DOC',HojaProduccionController.IFYG)

module.exports = Router;