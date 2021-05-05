const Joi = require('joi');


const schema = Joi.object().keys({

    rut: Joi.string()
    .min(9).message('Rut minimo 9')
    .max(12).message('Rut maximo 12')
    .required().messages({'any.required': `Rut es requerido`}),

    nombre: Joi.string().alphanum()
    .min(2).message('Nombre minimo 2')
    .max(30).message('Rut maximo 30')
    .required().messages({'any.required': `NOMBRE ES REQUERIDO`,'string.alphanum':'Nombre solo letras'}),


    apellido: Joi.string().alphanum()
    .min(2).message('Apellido minimo 2')
    .max(30).message('Apellido maximo 30')
    .required().messages({'any.required': `APELLIDO ES REQUERIDO`,'string.alphanum':'Apellido solo letras'}),


    direccion: Joi.string().
    min(2).message('Dirección minimo 2')
    .max(80).message('Dirección maximo 80')
    .required().messages({'any.required': `Dirección es requerido`}),

    contrasenia: Joi.string()
    .min(8).message('Contraseña minimo 8 digitos')
    .max(30).message('Contraseña maximo 30 digitos ')
    .required().messages({'any.required': `CONTRASEÑA ES REQUERIDO`}),

    id_rol: Joi.number()
    .integer()
    .required().messages({'any.required': `ROL ES REQUERIDO`,'number.base':'ID debe ser numerico'}),

    id_jefe: Joi.number()
    .integer().allow(null, ''),

    id_opcional_segundo_jefe: Joi.number()
    .integer().allow(null, ''),

    id_area: Joi.string().required(),

    estado: Joi.number().integer()

});

module.exports = {
    schema
}
