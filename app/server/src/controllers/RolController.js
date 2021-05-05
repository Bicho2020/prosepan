const db = require('../configurations/database');

module.exports = {

    show : async (req,res) =>{

        try {

            var query = `SELECT ID_ROL , DESCRIPCION FROM ROL`
            const data = await db.pool.query(query);
            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al listar' , error: err });

        }

    }

}