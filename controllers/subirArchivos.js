const path = require('path');
const fs = require('fs');



const retornarImagen =  (req, res) =>{

    try {
        const id = req.params.id;
        const imagen = req.params.imagen;
    
    const pathImg = path.join( __dirname, `../archivos/prospectos/${id}/${imagen}`);
    
    if(!fs.existsSync(pathImg)){
        pathImg.join(__dirname, '../archivos/prospectos/no-image.png');
        res.sendFile(pathImg);
    }else{
        res.sendFile(pathImg);
    }
        
    } catch (error) {
        res.status(500).json({
            statusCode:false,
            msg:'no se pudo visualizar la'
        });
        
    }

};




module.exports ={
    retornarImagen
}