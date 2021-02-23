const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { retornarImagen }= require('../controllers/subirArchivos');



const router = Router();


router.use(fileUpload());

router.get('/file/:id/:imagen', retornarImagen);

module.exports=router;