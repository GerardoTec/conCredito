const prospectoModel = require('../models/prospecto.model');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const multer= require('multer');
const path = require('path');

storage =multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'../archivos')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({storage});




  getProspecto = async (req, res) =>{

    const prospecto = await prospectoModel.find();
              
    res.json({
        StatusCode:true,
        prospecto
    });

   };

 crearProspecto = async (req, res) =>{

     const files = req.files.archivo;
     

     if(!req.files){
         return res.json({
             ok: false,
             msg: 'no hay archivos'
         });
      }

      // hacemos un arreglo con las extenciones validas
     const extencionesValidas = ['jpg','JPG','png','PNG','pdf','PDF','gif'];

     //manejamos el files, para saber si solo es un archivo o es mas de uno
         if(files.length){

            let valido = true;
        //recorremos el arreglo para poder sacar la extencion del archivo
             for(let i=0; i<files.length; i++){
               const cortado = files[i].name.split('.');
               const extencion = cortado[cortado.length-1].toLowerCase();
              // console.log(extencion);
    
              // validamos las extenciones 
                if(!extencionesValidas.includes(extencion)){
                    valido=false;
                    break;
                   console.log('no es una extencion valida');
                }  
                 // console.log( 'arreglo en la posicion',files[i]);
             }
             if(!valido){
                 return res.json({
                     ok:false,
                     msg:'un archivo no es valido revisa tus extenciones '
                 });
             }

         }else{
        // aqui solo llega cuando es un solo archivo 
            const nombreCortado = files.name.split('.');
            const extencionArchivo = nombreCortado[nombreCortado.length-1];

            if(!extencionesValidas.includes(extencionArchivo)){
                console.log('es un solo archivo')
                return res.status(500).json({
                    statusCode:false,
                    msg:'No es una extencion valida(png,jpg,pdf)'
                });
                
            }

         }

         const prospecto = new prospectoModel(req.body);
         const prospectoDB = await prospecto.save();

    pathProspecto = path.resolve( `./archivos/prospectos/${prospectoDB.id}`);
     fs.mkdirSync(pathProspecto,{recursive:true});

     if(files.length){
         for(let i =0; i<files.length; i++){
             const pathGuardar = `${pathProspecto}/${files[i].name}`; 
             files[i].mv(pathGuardar, (err)=>{
                 if(err){
                     res.status(500).json({
                         statusCode:false,
                         msg:'Occurrio un problema al mover los archivos'
                     }) 
                    }

                });
                nombreArchivo = `${files[i].name}`
                prospectoDB.archivo.push(nombreArchivo);  
                await prospectoDB.save();   
         }
     }else{
        const pathGuardar=  `${pathProspecto}/${files.name}`;   
        files.mv(pathGuardar,(err)=>{    
            if(err){
                res.status(500).json({
                    statusCode:false,
                    msg:'Occurrio un problema al mover el archivo'
                }) 
            }
        });

        nombreArchivo = `${files.name}`
        prospectoDB.archivo = nombreArchivo;
        await prospectoDB.save();
     }
  
     res.json({
         ok:true,
         prospectoDB
     });
    
 } 

 actualizar = async(req,res) =>{
     const id = req.params.id

     try {
         const prospecto = prospectoModel.findById(id)
         if(!prospecto){
             res.status(500).json({
                 statusCode:false,
                 msg:'No hay un usuario con ese ID'
             });
         }
         const campos = req.body;

         const prospectoActualizado = await prospectoModel.findByIdAndUpdate(id, campos, {new:true});

         res.json({
             statusCode: true,
             prospectoActualizado
         });
     } catch (error) {
         return res.status(500).json({
             statusCode:false,
             msg:'Hubo un problema al actualizar'
             });
     }
 }
 
 module.exports={
    getProspecto,
    crearProspecto,
    actualizar

           }