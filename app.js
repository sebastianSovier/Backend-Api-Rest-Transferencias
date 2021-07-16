const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const DestinatarioRouter = require('./routes/DestinatarioController.js');
const MovimientosRouter = require('./routes/MovimientosController.js');
const AccountRoutes = require('./routes/accountController.js');

var corsOptions = {
  origin: 'https://angular-app-transferencias.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use('/Account', AccountRoutes);
app.use('/Destinatario', DestinatarioRouter);
app.use('/Movimientos', MovimientosRouter);
app.use(cors(corsOptions));
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