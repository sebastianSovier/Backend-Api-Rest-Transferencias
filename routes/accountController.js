const express = require('express');
const router = express.Router();
const usuarioDal = require('../services/usuariosDal');
var jwt = require('jsonwebtoken');
var config = require('../config');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const helper = require('../helper');
var cors = require('cors');
var corsOptions = {
    origin: 'https://angular-app-transferencias.herokuapp.com/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.use(cors(corsOptions));
router.get('/ObtenerUsuarios', async function (req, res, next) {
    try {
        res.json(await usuarioDal.ObtenerUsuarios());
    } catch (err) {
        console.error(`Error al obtener usuarios: `, err.message);
        next(err);
    }
});

router.post('/Login', urlencodedParser, function (req, res) {
    try {
        console.log(req.body.Username + "  " + req.body.Password);
        err = "";
        if (!req.body.Username && !req.body.Password) {
            console.log(req.Username + "  " + req.Password);
            err = "invalid";
        }
        if (err === "invalid") return res.status(401).send({ auth: false, Error: "acceso no autorizado", mensaje: "ejecucion exitosa" })
        // create a token
        usuarioDal.ObtenerUsuario(req.body.Username).then(function (result) {
            console.log("resultadito");
            console.log(result);
            if (result.data.length > 0) {
                console.log("result:" + result.data[0].contrasena);
                if (req.body.Password === result.data[0].contrasena) {
                    var token = jwt.sign({ id: result.data[0].usuario_id }, config.secret, {
                        expiresIn: "1h"
                    });
                    global.token = token;
                    return res.status(200).send({ auth: true, access_Token: token, mensaje: "ejecucion exitosa" });
                } else {
                    return res.status(401).send({ auth: false, Error: "acceso no autorizado", mensaje: "ejecucion exitosa" });
                }
            } else {
                return res.status(401).send({ auth: false, Error: "acceso no autorizado", mensaje: "ejecucion exitosa" });
            }
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
        });

    } catch (err) {
        return res.status(400).send({ datos: { Codigo: "1", Error: "error al validar acceso" } });
    }
});

router.post('/IngresarUsuario', async function (req, res, next) {
    try {
        await usuarioDal.CrearUsuario(req.body).then(function (result) {

            return res.status(200).send({ Codigo: "0", Error: "ejecucion exitosa" });
        }).catch(function (error) {
            return res.status(400).send({ datos: { Codigo: "1", Error: "error al crear usuario" } });
        }).finally(function () {
        });
    } catch (err) {
        return res.status(400).send({ datos: { Codigo: "1", Error: "error al crear usuario" } });
    }
});

module.exports = router;