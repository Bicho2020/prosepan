const Joi = require('joi');


const schema = Joi.object().keys({

    nunero: Joi.string()
    .required(),

    fecha: Joi.string()
    .required().messages({'any.required': `FECHA ES REQUERIDO`}),
    
    nombre_proveedor: Joi.number()
    .integer() ,

    id_proveedor: Joi.number()
    .integer()

});

module.exports = {
    schema
}
