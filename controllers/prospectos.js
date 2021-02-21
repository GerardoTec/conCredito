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
     const { rfc } = req.body;
     const files = req.files.archivo;
     

     if(!req.files){
         return res.json({
             ok: false,
             msg: 'no hay archivos'
         });
      }

     const extencionesValidas = ['jpg','png','pdf','gif'];

         if(files.length){

            let valido = true;

             for(let i=0; i<files.length; i++){
               const cortado = files[i].name.split('.');
               const extencion = cortado[cortado.length-1].toLowerCase();
              // console.log(extencion);
    
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

    pathProspecto = path.resolve(__dirname, `../archivos/prospectos/${prospectoDB.id}`);
     fs.mkdirSync(pathProspecto,{recursive:true});

     if(files.length){
         for(let i =0; i<files.length; i++){
             const pathGuardar = `${pathProspecto}/${files[i].name}`;
              prospectoDB.archivo = pathGuardar;
              await prospectoDB.save();
             files[i].mv(pathGuardar, (err)=>{
                
                if(err){
                    console.log(err);  
                    }
                });
           //  console.log(pathGuardar)
         }
     }else{
        const pathGuardar=  `${pathProspecto}/${files.name}`;
        
        files.mv(pathGuardar,(err)=>{
           
            if(err){
                console.log(err);
            }
        });
        
       // console.log(pathGuardar);
     }

      
       
    

      console.log(prospectoDB);


     res.json({
         ok:true
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