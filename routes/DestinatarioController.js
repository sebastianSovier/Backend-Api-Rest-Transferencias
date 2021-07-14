const express = require('express');
const router = express.Router();
const DestinatarioDal = require('../services/DestinatarioDal');
var jwt = require('jsonwebtoken');
var config = require('../config');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const helper = require('../helper');

router.get('/ObtenerDestinatario', async function (req, res, next) {
    try {
        res.json(await DestinatarioDal.BuscarDestinatario());
    } catch (err) {
        console.error(`Error al obtener destinatarios: `, err.message);
        next(err);
    }
});

router.post('/IngresarDestinatario', async function (req, res, next) {
    try {
        await DestinatarioDal.CrearDestinatario(req.body).then(function (result) {
            try {
                return res.status(200).send({ datos: "ok" });
            } catch (error) {
                console.log(error);
                return res.status(400).send({ datos: { Error: "error al crear destinatario" } });
            }
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
        });
    } catch (err) {
        console.error(`Error al crear destinatario: `, err.message);
        next(err);
    }
});

module.exports = router;