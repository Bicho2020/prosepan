const Joi = require('joi');


const schema = Joi.object().keys({

    id_materia_prima: Joi.string()
    .min(1).message('Id Minimo 1')
    .max(13).message('Id Maximo 30')
    .required().messages({'any.required': `Id material prima es requerido`}),

    nombre: Joi.string()
    .min(2).message('Nombre minimo 1')
    .max(60).message('Nombre maximo 60')
    .required().messages({'any.required': `NOMBRE ES REQUERIDO`}),
    
    unidad_medida: Joi.string()
    .required(),

    tipo_articulo: Joi.number()
    .integer()
    .required().messages({'any.required': `Es materia prim es requerido`,'number.base':'Es materia prima debe ser numerico'}),

    estado: Joi.number()
    .integer()
    .required().messages({'any.required': `Estado  es requerido`,'number.base':'Estado debe ser numerico'}),

});

module.exports = {
    schema
}
