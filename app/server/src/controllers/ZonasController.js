const db = require('../configurations/database');
const zona = require('../models/ZonaModels');

module.exports = {

    show : async (req,res) =>{

        try {

            var query = `SELECT ID_ZONA , NOMBRE , ESTADO FROM ZONA`;
            const data = await db.pool.query(query);
            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al listar' , error: err });

        }

    } ,

    create : async (req,res) =>{

        try {

            const  value  = await zona.schema.validateAsync(req.body);

            var query = `INSERT INTO ZONA VALUES ($1,$2,$3)`;
            const data = await db.pool.query(query,
                [value.id_zona,
                value.nombre,
                value.estado]);
            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al crear zona' , error: err });

        }

    } ,

    remove : async (req,res) =>{

        try {

            const ID = req.params.id;
           
            var query = `DELETE FROM ZONA WHERE ID_ZONA = $1`;
            const data = await db.pool.query(query,[ID]);

            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al eliminar' , error: err });

        }

    } ,

    update : async (req,res) =>{

        try {

            const ID = req.params.id;
            const  value  = await zona.schema.validateAsync(req.body);

            var query = `UPDATE zona SET ID_ZONA = $1 , NOMBRE = $2 , ESTADO = $3 WHERE ID_ZONA = $4`;
            const data = await db.pool.query(query,
                [value.id_zona,
                value.nombre,  
                value.estado , 
                ID]);

            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al modificar' , error: err });

        }

    }

}