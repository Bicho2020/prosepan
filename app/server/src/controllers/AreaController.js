const db = require('../configurations/database');
const area = require('../models/AreaModels');

module.exports = {

    show : async (req,res) =>{

        try {

            var query = `SELECT ID_AREA , NOMBRE , ESTADO FROM AREA`;
            const data = await db.pool.query(query);
            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al listar' , error: err });

        }

    } ,

    create : async (req,res) =>{

        try {

            const  value  = await area.schema.validateAsync(req.body);

            var query = `INSERT INTO AREA VALUES ($1,$2,$3)`;
            const data = await db.pool.query(query,
                [value.id_area,
                value.nombre,
                value.estado]);
            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al crear area' , error: err });

        }

    } ,

    remove : async (req,res) =>{

        try {

            const ID = req.params.id;
           
            var query = `DELETE FROM AREA WHERE ID_AREA = $1`;
            const data = await db.pool.query(query,[ID]);

            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al eliminar' , error: err });

        }

    } ,

    update : async (req,res) =>{

        try {

            const ID = req.params.id;
            const  value  = await area.schema.validateAsync(req.body);

            var query = `UPDATE AREA SET ID_AREA = $1 , NOMBRE = $2 , ESTADO = $3 WHERE ID_AREA = $4`;
            const data = await db.pool.query(query,
                [value.id_area,
                value.nombre,  
                value.estado , 
                ID]);

            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al modificar' , error: err });

        }

    }

}