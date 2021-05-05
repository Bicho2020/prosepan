const Joi = require('joi');


const schema = Joi.object().keys({

    rut: Joi.string()
    .min(9).message('Rut minimo 9')
    .max(12).message('Rut maximo 12')
    .required().messages({'any.required': `Rut es requerido`}),

    contrasenia: Joi.string()
    .min(8).message('Contraseña minimo 8 digitos')
    .max(30).message('Contraseña maximo 30 digitos ')
    .required().messages({'any.required': `CONTRASEÑA ES REQUERIDO`}),

});

module.exports = {
    schema
}