const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const DestinatarioRouter = require('./routes/DestinatarioController.js');
const MovimientosRouter = require('./routes/MovimientosController.js');
const AccountRoutes = require('./routes/accountController.js');



app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/Account', AccountRoutes);
app.use('/Destinatario', DestinatarioRouter);
app.use('/Movimientos', MovimientosRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ 'message': err.message });
  return;
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});