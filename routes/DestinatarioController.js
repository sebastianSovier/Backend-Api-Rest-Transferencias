const express = require('express');
const router = express.Router();
const DestinatarioDal = require('../services/DestinatarioDal');
var jwt = require('jsonwebtoken');
var config = require('../config');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const helper = require('../helper');

router.get('/ObtenerDestinatario', helper.verifyToken, async function (req, res, next) {
    try {
        return res.status(200).send({ datos: { Codigo: "0", data: res.json(await DestinatarioDal.BuscarDestinatarios()) } });
    } catch (err) {
        console.error(`Error al obtener destinatarios: `, err.message);
        return res.status(400).send({ datos: { Error: "error al obtener destinatarios" } });
    }
});

router.post('/IngresarDestinatario', helper.verifyToken, async function (req, res, next) {
    try {
        await DestinatarioDal.CrearDestinatario(req.body).then(function (result) {
            try {
                return res.status(200).send({ datos: { Codigo: "0", Error: "ejecucion exitosa" } });
            } catch (error) {
                console.log(error);
                return res.status(400).send({ datos: { Codigo: "1", Error: "error al crear destinatario" } });
            }
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
        });
    } catch (err) {
        console.error(`Error al crear destinatario: `, err.message);
        return res.status(400).send({ datos: { Codigo: "1", Error: "error al crear destinatario" } });
    }
});

module.exports = router;