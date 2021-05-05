const db = require('../configurations/database');
const articulo = require('../models/ArticuloModel');


module.exports = {

    show : async (req,res) =>{

        try {

            var query = `SELECT ID_MATERIA_PRIMA , NOMBRE , UNIDAD_MEDIDA , tipo_articulo , ESTADO FROM ARTICULO ORDER BY ID_MATERIA_PRIMA ASC`;

            const data = await db.pool.query(query);
            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al listar' , error: err });

        }

    },

    create : async (req,res) =>{

        try {

            const  value  = await articulo.schema.validateAsync(req.body);

            await db.pool.query('INSERT INTO ARTICULO (ID_MATERIA_PRIMA , NOMBRE , UNIDAD_MEDIDA , tipo_articulo, ESTADO) VALUES ($1,$2,$3,$4,$5)', 
            [value.id_materia_prima,value.nombre,value.unidad_medida,value.tipo_articulo,value.estado])

            return res.status(200).send({message:'articulo Guardado'});
            
        } catch (err) {

            if(err.details){

                return res.status(404).send(err.details[0])

            } else {

                return res.status(500).send(err)

            } 
         
        }

    },

    remove : async (req,res) =>{

        try {

            const ID = req.params.id;

            var query = `DELETE FROM ARTICULO WHERE ID_MATERIA_PRIMA = $1`;

            await db.pool.query(query,[ID]);
            return res.status(200).send(({mensaje:'eliminado'}));

        } catch (err) {

            return res.status(500).send({message:'Error al eliminar' , error: err });

        }

    },

    modify : async (req,res) =>{

        try {

            const ID = req.params.id;

            const  value  = await articulo.schema.validateAsync(req.body);

            await db.pool.query('UPDATE ARTICULO SET NOMBRE = $1 , UNIDAD_MEDIDA = $2 , TIPO_ARTICULO = $3 , ESTADO = $4 ,  ID_MATERIA_PRIMA = $5 WHERE ID_MATERIA_PRIMA = $6', 
            [value.nombre,
            value.unidad_medida,
            value.tipo_articulo,
            value.estado,
            value.id_materia_prima,
            ID])

            return res.status(200).send({message:'articulo modificado'});
            
        } catch (err) {

            if(err.details){

                return res.status(404).send(err.details[0])

            } else {

                return res.status(500).send(err)

            } 
         
        }

    },

}