const express = require('express');
const router = express.Router();
const MovimientosDal = require('../services/MovimientosDal');
const helper = require('../helper');

/* GET programming languages. */
router.get('/ObtenerMovimientos', async function (req, res, next) {
  try {
    res.json(await MovimientosDal.ObtenerHistorialMovimientos());
  } catch (err) {
    console.error(`Error al obtener movimientos: `, err.message);
    next(err);
  }
});
router.post('/IngresarTransferencia', async function (req, res, next) {
  try {
    MovimientosDal.CrearTransferencia(req.body).then(function (result) {

    }).catch(function (error) {
      console.log(error);
    }).finally(function () {
    });

  } catch (err) {
    console.error(`Error al insertar movimiento: `, err.message);
    next(err);
  }
});

module.exports = router;