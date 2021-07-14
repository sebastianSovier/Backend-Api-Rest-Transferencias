const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function ObtenerHistorialMovimientos(pais_id) {
  const rows = await db.query(
      `SELECT d.nombre_destinatario, d.rut_destinatario, d.banco_destino,d.tipo_cuenta,t.monto_transferencia
  FROM Transferencias t, Destinatario d where d.destinatario_id = t.destinatario_id order by t.destinatario_id`,
  [pais_id]
  );
  const data = helper.emptyOrRows(rows);

  return {
      data
  }
}

async function CrearTransferencia(TransferenciaRequest) {
  const result = await db.query(
      `INSERT INTO Transferencias 
  (destinatario_id, monto_transferencia) 
  VALUES 
  (?, ?)`,
      [
        TransferenciaRequest.destinatario_id, TransferenciaRequest.monto_transferencia
      ]
  );

  let message = 'Hubo error al Insertar ciudad';

  if (result.affectedRows) {
      message = 'Se inserto ciudad correctamente';
  }

  return { message };
}

module.exports = {
  ObtenerHistorialMovimientos,
  CrearTransferencia,
}