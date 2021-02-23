const express = require('express');

const cors = require('cors');
const { dbConnection } = require('./database/config');
const bodyParse = require('body-parser');
require('dotenv').config();

//levantar express
const app = express();

app.use(cors());

// lectura y parseo del body
app.use(express.json());
app.use(bodyParse.urlencoded({extends:true}))

//base de datos 
dbConnection();

//rutas

app.use('/api/prospectos', require('./routes/prospecto.route.js'));
app.use('/api/subir',require('./routes/subirArchivos'));

app.listen(process.env.PORT, ()=>{
    console.log('corroendo en el puerto' + process.env.PORT );
});