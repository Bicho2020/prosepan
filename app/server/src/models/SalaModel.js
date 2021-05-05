const Joi = require('joi');


const schema = Joi.object().keys({

    id_sala: Joi.string()
    .min(1).message('Id Minimo 1')
    .max(13).message('Id Maximo 30')
    .required().messages({'any.required': `Id Sala es requerido`}),

    nombre: Joi.string()
    .min(2).message('Nombre minimo 1')
    .max(60).message('Nombre maximo 60')
    .required().messages({'any.required': `NOMBRE ES REQUERIDO`}),
    
    id_zona: Joi.string()
    .required(),
    
    estado: Joi.number()
    .required(),

});

module.exports = {
    schema
}
