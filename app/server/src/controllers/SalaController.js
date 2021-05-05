const db = require('../configurations/database');
const sala = require('../models/SalaModel');

module.exports = {

    show : async (req,res) =>{

        try {

            var query = `SELECT S.ID_SALA , S.NOMBRE , S.ID_ZONA , Z.NOMBRE AS NOMBRE_ZONA , S.ESTADO FROM SALA AS S JOIN ZONA AS Z ON Z.ID_ZONA = S.ID_ZONA ORDER BY S.NOMBRE ASC`;
            const data = await db.pool.query(query);
            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al listar' , error: err });

        }

    } ,

    create : async (req,res) =>{

        try {

            const  value  = await sala.schema.validateAsync(req.body);

            var query = `INSERT INTO SALA VALUES ($1,$2,$3,$4)`;
            const data = await db.pool.query(query,
                [value.id_sala,
                value.nombre,
                value.id_zona,
                value.estado]);
            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al crear sala' , error: err });

        }

    } ,

    remove : async (req,res) =>{

        try {

            const ID = req.params.id;
           
            var query = `DELETE FROM SALA WHERE ID_SALA = $1`;
            const data = await db.pool.query(query,[ID]);

            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al aliminar' , error: err });

        }

    } ,

    update : async (req,res) =>{

        try {

            const ID = req.params.id;
            const  value  = await sala.schema.validateAsync(req.body);

            var query = `UPDATE SALA SET ID_SALA = $1 , NOMBRE = $2 , ID_ZONA = $3 , ESTADO = $4 WHERE ID_SALA = $5`;
            console.log(`UPDATE SALA SET ID_SALA = ${value.id_sala} , NOMBRE = ${value.nombre} , ID_ZONA = ${value.id_zona} , ESTADO = ${value.estado} WHERE ID_SALA = ${ID}`);
            const data = await db.pool.query(query,[value.id_sala,value.nombre, value.id_zona , value.estado , ID]);

            return res.status(200).send((data.rows));

        } catch (err) {
            return res.status(500).send({message:'Error al modificar' , error: err });

        }

    },

    opdrag: async (req , res) => {

        try {

            const ID = req.params.id_usuario;

            const  value  = req.body;

            let cuerpo_query = 'INSERT INTO ASIGNACION_SALA (ID_USUARIO, ID_SALA) VALUES';

            value.map((value) => {
                cuerpo_query += ` ('${ID}','${value.id_sala}'),`;
            });

            const query = cuerpo_query.slice(0, -1)

            await db.pool.query(query);
    
            return res.status(200).send({message:'success'});

        } catch (err) {

            return res.status(500).send({message:'Error al aliminar' , error: err });

        }

    } ,

    user_salas: async (req , res) => {

        try {

            const ID = req.params.id_usuario;
            let query = `SELECT 
            S.ID_SALA , 
            S.NOMBRE , 
            Z.NOMBRE as zona , 
            CASE WHEN S.ID_SALA IN (SELECT ID_SALA FROM ASIGNACION_SALA WHERE ID_USUARIO = $1 ) THEN true ELSE false END ASIGNACION
            FROM SALA AS S JOIN ZONA AS Z ON Z.ID_ZONA = S.ID_ZONA WHERE S.ESTADO = 1 ORDER BY S.NOMBRE ASC `;

            const data = await db.pool.query(query,[ID]);

            return res.status(200).send(data.rows);

        } catch (err) {

            return res.status(500).send({message:'Error al listar asignación' , error: err });

        }

    } ,

    change_opdrag : async (req , res) => {

        try {

            const TIPO = req.params.tipo;
            const ID_USUARIO = req.params.id_usuario;
            const ID_SALA = req.params.id_sala;

            let query;

            if(parseInt(TIPO) === 1) {

                query = 'INSERT INTO ASIGNACION_SALA (ID_USUARIO,ID_SALA) VALUES ($1 , $2)';

            } else {

                query = 'DELETE FROM ASIGNACION_SALA WHERE ID_USUARIO  = $1 AND ID_SALA = $2';

            }

            await db.pool.query(query,[parseInt(ID_USUARIO),ID_SALA]);

            return res.status(200).send({message:'success'});

        } catch (err) {

            return res.status(500).send({message:'Error al cambiar asignacion' , error: err });

        }

    }

}