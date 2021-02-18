const prospectoModel = require('../models/prospecto.model');




getProspecto = async (req, res) =>{

    const prospecto = await prospectoModel.find();
              
    

    res.json({
        StatusCode:true,
        prospecto
    });

};

 crearProspecto = async (req, res) =>{

    const { rfc } = req.body;

    try {
        const existe = await prospectoModel.findOne({rfc});
      // verificamos que no exista un prospecto 
        if(existe){
            return res.status(400).json({
                StatusCode: false,
                msg: ' Ya existe un prospecto con ese RFC'
            });
        }
        //creamos al Prospecto
        const prospecto = new prospectoModel(req.body)

         await prospecto.save();

         res.json({
             StatusCode:true,
             prospecto,
             msg:'Se ha creado exitosamente'
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            StatusCode:false,
            msg:'error al crear'
        });
    }
};

module.exports={
    getProspecto,
    crearProspecto,

}