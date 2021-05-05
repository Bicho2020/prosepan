const Joi = require('joi');


const schema = Joi.object().keys({

    id_zona: Joi.string()
    .min(1).message('Id Minimo 1')
    .max(13).message('Id Maximo 30')
    .required().messages({'any.required': `Id zona es requerido`}),

    nombre: Joi.string()
    .min(2).message('Nombre minimo 1')
    .max(60).message('Nombre maximo 60')
    .required().messages({'any.required': `NOMBRE ES REQUERIDO`}),

    estado: Joi.number()
    .required(),

});

module.exports = {
    schema
}
