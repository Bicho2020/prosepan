const Joi = require('joi');


const schema = Joi.object().keys({

    codigo: Joi.string()
    .min(1).message('Id Minimo 1')
    .max(50).message('Id Maximo 50')
    .required().messages({'any.required': `nunero es requerido`}),

    fecha: Joi.string()
    .required().messages({'any.required': `FECHA ES REQUERIDO`}),
    
    saldo_anterior: Joi.number()
    .integer() ,

    salida: Joi.string()
    .integer() ,

    entrada: Joi.string()
    .integer() ,

    saldo_final: Joi.string()
    .integer() ,

    observacion: Joi.string()
    .integer() ,

    id_articulo: Joi.string()
    .integer() ,

});

module.exports = {
    schema
}
