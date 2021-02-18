const { Router } = require("express");
const { check } = require("express-validator");
const {validarDatos } =require('../middleware/validarCampos');
const { getProspecto , crearProspecto} = require("../controllers/prospectos");


const router = Router();

router.get('/', getProspecto);

router.post('/',
                   [
                     check('nombre','el nombre es obligatorio').not().isEmpty(),
                     check('primerApellido','el Apellido es obligatorio').not().isEmpty(),
                     check('calle','La calle es obligatoria').not().isEmpty(),
                     check('numero','el numero es obligatorio').not().isEmpty(),
                    check('codigoPostal','el codigo postal es obligatorio').not().isEmpty(),
                     check('telefono','el telefono es obligatorio').not().isEmpty(),
                     check('rfc','el RFC es obligatorio').not().isEmpty(),
                     validarDatos
                   ],
                crearProspecto );

module.exports = router;