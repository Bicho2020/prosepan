const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const config = require("./configurations/server");
const user = require("./routers/UsuarioRouter");
const rol = require("./routers/RolRouter");
const sala = require("./routers/SalaRouter");
const articulo = require("./routers/ArticuloRouter");
const zona = require("./routers/ZonasRouter");
const area = require("./routers/AreasRouter");
const login = require("./routers/LoginRouter");
const hp = require("./routers/HojaProduccionRouter");

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://${config.HOST}:${config.PORT}`)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    next();
})



app.use(cors());
app.use('/api/usuario/', user);
app.use('/api/rol/', rol);
app.use('/api/sala/', sala);
app.use('/api/articulo/', articulo);
app.use('/api/zona/', zona);
app.use('/api/area/', area);
app.use('/api/login/', login);
app.use('/api/hoja-produccion/', hp);


module.exports = app