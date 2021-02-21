const { Router } = require("express");
const { check } = require("express-validator");
const {validarDatos } =require('../middleware/validarCampos');
const { getProspecto , crearProspecto, actualizar} = require("../controllers/prospectos");
const { subirArchivo } = require("../controllers/subirArchivos");
const fileUpload = require('express-fileupload');


const router = Router();

router.use(fileUpload());

router.get('/', getProspecto);

router.post('/',crearProspecto );
                
router.put('/:id', actualizar);

module.exports = router;