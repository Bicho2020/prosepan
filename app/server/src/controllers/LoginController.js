const db = require('../configurations/database');
const login = require('../models/LoginModel');
const { validate , format } = require('rut.js')

module.exports = {

    signup : async (req,res) =>{

        try {

            let rs;
            
            const  value  = await login.schema.validateAsync(req.body);
            var Rut = format(value.rut);

            if(validate(value.rut)) {

                var query = `SELECT id_usuario ,id_rol , id_usuario FROM USUARIO WHERE RUT= $1 AND CONTRASENIA = $2`;

                const data = await db.pool.query(query,[Rut,value.contrasenia]);
    
                rs = data.rows.length;
    
                if(rs != 0){
                    return res.status(200).send(({rs,rol:data.rows[0].id_rol,id_usuario:data.rows[0].id_usuario}));
                } else {
                    return res.status(200).send(({rs:0}));
                }
    
            } else {
                return res.status(401).send(({causa:'rut',message:'Rut invalido'}));
            }

           
       

        } catch (err) {

            return res.status(500).send({message:'Error login' , error: err });

        }

    },

 

}