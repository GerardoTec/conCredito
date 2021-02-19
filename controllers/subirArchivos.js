const { v4: uuidv4 } = require('uuid');
const prospectoModel = require('../models/prospecto.model');
const path = require('path');
const fs = require('fs');


const subirArchivo = async (req,res)=> {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //validar tipo 

    const tiposValidos = 'prospectos';
    if(!tiposValidos.includes(tipo)){
        return res.status(500).json({
            statusCode: false,
            msg:'No es de tipo Prospectos'
        });
    }

    //validar que exista una extencion

    if(!req.files || Object.keys(req.files).length=== 0){
        return res.status(500).json({
            statusCode:false,
            msg:'No hay ningun archivo'
        });
    }

    //procesar el archivo

    const file = req.files.archivo;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length-1];

    //validar extencion

    const extencionesValidas = ['png','PNG', 'jpg','jpeg','pdf']

    if(!extencionesValidas.includes(extencionArchivo)){
        return res.status(500).json({
            statusCode:false,
            msg:'No es una extencion valida(png,jpg,pdf)'
        });
    }
    //generar nombre unico
    const nombreArchivo =  `${uuidv4()}.${extencionArchivo}`;


    //path para guardar el archivo

    const directorio = path.join(__dirname, `../archivos/${tipo}/`);

       // Verifica si existe la carpeta, si no existe la crea
       if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio, {recursive: true});
    }

    directorioGuardar = `${directorio}/${nombreArchivo}`;

   
    //mover el archivo

     file.mv(directorioGuardar, (err)=>{
         if(err){
             console.log(err);
             return res.status(500).json({
                 statusCode:false,
                 msg:'Error al mover el archivo'
             });
         }
     });

    const prospecto = await prospectoModel.findById(id);

    if(!prospecto){
        return res.status(500).json({
            statusCode:false,
            msg:'NO hay un prospecto con ese id '
        });
    }
    prospecto.archivo = nombreArchivo;
    await prospecto.save();

    res.json({
        statusCode:true,
        msg:'Archivos subidos',
        nombreArchivo
    });
}

const retornarImagen =  (req, res) =>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

const pathImg = path.join( __dirname, `../archivos/${ tipo }/${ foto }`);

if ( fs.existsSync( pathImg ) ) {
    res.sendFile( pathImg );
}



};
module.exports ={
    subirArchivo,
    retornarImagen
}