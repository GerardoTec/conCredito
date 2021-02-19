const { Router } = require('express');
const fileUpload = require('express-fileupload');
const {subirArchivo, retornarImagen }= require('../controllers/subirArchivos');



const router = Router();


router.use(fileUpload());

router.put('/:tipo/:id', subirArchivo);

router.get('/:tipo/:foto', retornarImagen);

module.exports=router;