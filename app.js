const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const DestinatarioRouter = require('./routes/DestinatarioController.js');
const MovimientosRouter = require('./routes/MovimientosController.js');
const AccountRoutes = require('./routes/accountController.js');



app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var corsOptions = {
  origin: 'https://angular-app-transferencias.herokuapp.com/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use('/Account', AccountRoutes,cors(corsOptions));
app.use('/Destinatario', DestinatarioRouter,cors(corsOptions));
app.use('/Movimientos', MovimientosRouter,cors(corsOptions));

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