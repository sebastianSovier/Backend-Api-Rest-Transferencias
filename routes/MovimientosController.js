const express = require('express');
const router = express.Router();
const MovimientosDal = require('../services/MovimientosDal');
const helper = require('../helper');

/* GET programming languages. */
router.get('/ObtenerMovimientos', helper.verifyToken, async function (req, res, next) {
  try {

    return res.status(200).send({ datos: await MovimientosDal.ObtenerHistorialMovimientos() });
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