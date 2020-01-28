const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./config/config')

//object modeling
const mongoose = require('mongoose');

// codif para las consultas
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //simple data

// parse application/json
app.use(bodyParser.json())

//rutas
app.use(require('./routes/usuario'));


//conexion a base de datos mediante mongoose
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {

        if (err) throw err;

        console.log('Base de datos ONLINE!');
    });

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});