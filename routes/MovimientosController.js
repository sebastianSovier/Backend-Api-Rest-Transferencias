const express = require('express');
const router = express.Router();
const MovimientosDal = require('../services/MovimientosDal');
const helper = require('../helper');
var cors = require('cors');
var corsOptions = {
  origin: 'https://angular-app-transferencias.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.use(cors(corsOptions));
/* GET programming languages. */
router.post('/ObtenerMovimientos', helper.verifyToken, async function (req, res, next) {
  try {

    return res.status(200).send({ datos:{Codigo: "0" , data:await MovimientosDal.ObtenerHistorialMovimientos(req.body.usuario)}});
  } catch (err) {
    console.error(`Error al obtener movimientos: `, err.message);
    return res.status(400).send({ datos: { Error: "error al obtener destinatarios" } });
  }
});
router.post('/IngresarTransferencia', helper.verifyToken, async function (req, res, next) {
  try {
    MovimientosDal.CrearTransferencia(req.body).then(function (result) {
      return res.status(200).send({ datos: {Codigo:"0",Error:"ejecucion exitosa"} });
    }).catch(function (error) {
      return res.status(400).send({ datos: {Codigo:"1", Error: "error al obtener destinatarios" } });
    }).finally(function () {
    });

  } catch (err) {
    return res.status(400).send({ datos: {Codigo:"1", Error: "error al obtener destinatarios" } });
  }
});

module.exports = router;