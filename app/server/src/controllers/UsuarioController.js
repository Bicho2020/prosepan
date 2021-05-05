const db = require('../configurations/database');
const user = require('../models/UsuarioModel');

const { validate , format } = require('rut.js')

module.exports = {

    show : async (req,res) =>{

        try {

            var query = `SELECT U.ID_USUARIO ,
            U.RUT ,
            U.NOMBRE ,
            U.APELLIDO ,
            U.DIRECCION ,
            U.CONTRASENIA ,
            U.id_rol,
            CASE WHEN U.id_jefe IS NULL THEN '999999' ELSE U.id_jefe END id_jefe ,
            CASE WHEN U.ID_OPCIONAL_SEGUNDO_JEFE  IS NULL THEN '999999' ELSE U.id_jefe end ID_OPCIONAL_SEGUNDO_JEFE,
            R.DESCRIPCION as rol ,
            CASE 
            WHEN U.ID_JEFE IS NOT NULL THEN (SELECT  NOMBRE || ' ' || APELLIDO FROM USUARIO WHERE ID_USUARIO = U.ID_JEFE LIMIT 1) ELSE null END JEFE,
            CASE 
            WHEN U.ID_OPCIONAL_SEGUNDO_JEFE IS NOT NULL THEN (SELECT  NOMBRE || ' ' || APELLIDO FROM USUARIO WHERE ID_USUARIO = U.ID_OPCIONAL_SEGUNDO_JEFE LIMIT 1) ELSE null END JEFE_2,
            U.ESTADO ,
            AR.NOMBRE as nombre_area  ,
            U.ID_AREA
            FROM USUARIO AS U 
            JOIN ROL AS R 
            ON R.ID_ROL = U.ID_ROL
            JOIN AREA AR
            ON AR.id_area = U.id_area
            ORDER BY U.NOMBRE ASC`

            const data = await db.pool.query(query);
            return res.status(200).send((data.rows));

        } catch (err) {

            return res.status(500).send({message:'Error al listar' , error: err });

        }

    },

    create : async (req,res) =>{

        try {

            const  value  = await user.schema.validateAsync(req.body);

            var jefe ;
            var jefe2 ;
            var Rut = format(value.rut);

        

            if(value.id_jefe === 999999){
                jefe = null;
            } else {
                jefe = value.id_jefe;
            }

            if(value.id_opcional_segundo_jefe === 999999){
                jefe2 = null;
            } else {
                jefe2 = value.id_opcional_segundo_jefe;
            }
        
            
            const data = await db.pool.query('SELECT COUNT(ID_USUARIO) as ID FROM USUARIO WHERE RUT = $1',[Rut]);
            const ID = data.rows;

        

            if(parseInt(ID[0].id) === 0){
                if(validate(value.rut)){

                    await db.pool.query('INSERT INTO USUARIO (RUT,NOMBRE,APELLIDO,DIRECCION,CONTRASENIA,ID_ROL,ID_JEFE,ID_OPCIONAL_SEGUNDO_JEFE,id_area,ESTADO) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', 
                    [Rut,value.nombre,value.apellido,value.direccion,value.contrasenia,value.id_rol,jefe,jefe2,value.id_area,1])

                    const LAST_ID = await db.pool.query('SELECT ID_USUARIO FROM USUARIO ORDER BY ID_USUARIO DESC LIMIT 1');
    
                    return res.status(201).send({message:'Cliente Guardado',code:LAST_ID.rows[0]});

                } else {
                    return res.status(406).send({message: `Rut Invalido : ${value.cl_rut}`});
                }
            } else {
                return res.status(406).send({message: `Rut ya registrado`,causa:'Rut'});
            }

            

        } catch (err) {

            if(err.details){

                return res.status(404).send(err.details[0])

            } else {

                return res.status(500).send(err)

            } 
         
        }

    },

   
    delete : async (req,res) =>{

        try {

            const id_usuario = req.params.id;

            var query = `DELETE FROM USUARIO WHERE ID_USUARIO = $1`;

            await db.pool.query(query,[id_usuario]);
            return res.status(200).send(({mensaje:'eliminado'}));

        } catch (err) {

            return res.status(500).send({message:'Error al eliminar' , error: err });

        }

    },


    modify : async (req,res) =>{

        try {

            const  value  = await user.schema.validateAsync(req.body);

            const id_usuario = req.params.id_usuario;

            var jefe ;
            var jefe2 ;
            var Rut = format(value.rut);

    
            if(value.id_jefe === 999999){
                jefe = null;
            } else {
                jefe = value.id_jefe;
            }

            if(value.id_opcional_segundo_jefe === 999999){
                jefe2 = null;
            } else {
                jefe2 = value.id_opcional_segundo_jefe;
            }
        

            
            if(validate(value.rut)){
                
                await db.pool.query(`UPDATE USUARIO SET NOMBRE = $1 , APELLIDO = $2 , DIRECCION = $3 , CONTRASENIA = $4 , ID_ROL = $5 , ID_OPCIONAL_SEGUNDO_JEFE = $6 , id_area = $7 , ESTADO = $8 , RUT = $9 , ID_JEFE = $10 WHERE ID_USUARIO = $11 `, 
                [value.nombre,value.apellido,value.direccion,value.contrasenia,value.id_rol,jefe2,value.id_area,value.estado,Rut,jefe,id_usuario])

                return res.status(200).send({message:'Cliente modificado'});
            } else {
                return res.status(406).send({message: `Rut Invalido : ${value.cl_rut}`});
            }
            

            

        } catch (err) {

            if(err.details){

                return res.status(404).send(err.details[0])

            } else {

                return res.status(500).send(err)

            } 
         
        }

    },


    data :  async (req,res) =>{

        try {

            const rut = req.params.rut;

            let query = "SELECT US.NOMBRE || ' ' || US.APELLIDO as NOMBRE , R.DESCRIPCION as ROL  FROM USUARIO AS US JOIN ROL AS R ON R.ID_ROL = US.ID_ROL WHERE US.RUT = $1";
            
            const data = await db.pool.query(query,[rut]);

            return res.status(200).send((data.rows));

        } catch  {


            return res.status(500).send(err)

        }
    }

  

}