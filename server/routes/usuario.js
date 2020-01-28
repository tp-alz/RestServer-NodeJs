const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

//ruta encontrar usuario
app.get('/usuario', function(req, res) {

    //parametros de la consulta
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //encuentra al usuario
    Usuario.find({}, 'nombre email role goole img')
        .limit(limite)
        .skip(desde)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //respuesta json
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios

                });
            });
        });
});

//ruta agregar usuario
app.post('/usuario', function(req, res) {

    //parametros de las consultas
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        img: body.img
    });

    //guarda al usuario si lo encuentra
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //respuesta json
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});

//ruta modificar usuario
app.put('/usuario/:id', function(req, res) {

    //parametros de la consultas
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //actualiza al usuario si lo encuentra
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        //respuesta json 
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});


//ruta eliminar usuario
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    //elimina al usuario si lo encuentra
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //respuesta json fallida
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        //respuesta json correcta
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
});

module.exports = app;