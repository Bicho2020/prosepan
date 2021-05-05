const db = require('../configurations/database');
const IFYG = require('../models/IFYGModel');

module.exports = {

  
    IFYG : async (req,res) =>{
        
        try {

            const DOC = req.params.DOC;
            const value = req.body;

            value.forEach(x => {

                let b = 0;

                value.forEach(y => { 
                    if(x.numero === y.numero) return b++;
                });

                if(b > 1 ) return res.status(500).send({causa:'Datos Repetidos' , message:'Numero repetido'});
            });

            value.forEach( async (v) => {

                try{

                    const x =  await IFYG.schema.validateAsync(v);

                    cuerpo_query += ` ('${x.numero}','${x.fecha}','${x.nombre_proveedor}' , '${x.id_proveedor}','${DOC}'),`;

                } catch (err){

                    return res.status(401).send(err);
                }
             
            });

            let cuerpo_query = 'INSERT INTO IFYG (NUMERO,FECHA,NOMBRE_PROVEEDOR,ID_PROVEEDOR,DOC_NUM) VALUES ';    

        
            const query = cuerpo_query.slice(0, -1)

            await db.pool.query(query);

            return res.status(201).send({message:'Guardado'});
            
        } catch (err) {

           
            return res.status(500).send(err);
        }

    },


    X : async (req,res) =>{
        
        try {

         

            return res.status(201).send({message:'Guardado'});

            
        } catch (err) {

           
            return res.status(500).send(err);
        }

    },

}