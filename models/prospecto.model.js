const {Schema, model} = require('mongoose');


const ProspectoSchema = Schema({
    nombre:{
        type: String,
        require:true
    },
    primerApellido: {
        type: String,
        require: true
    },
    segundoApellido:{
        type: String
    },
    calle:{
        type: String,
        require: true
    },
    numero:{
        type:String,
        require:true
    },
    colonia:{
        type:String,
        require: true
    },
    codigoPostal:{
        type: String,
        require: true
    },
    telefono:{
        type: String,
        require: true
    },
    rfc:{
        type:String,
        require:true    
    },
    archivo:[
        {  
            type: String
        }
        ],
    estado:{
         type:String,
         default:'Pendiente',
    },
    motivo:{
        type:String,
        require:true
    }
});

ProspectoSchema.method('toJSON', function(){
    const{ __v , ...object }= this.toObject();
    return object;
});

module.exports = model('Prospecto',ProspectoSchema);

