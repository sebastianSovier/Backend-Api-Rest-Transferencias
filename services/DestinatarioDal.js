const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function BuscarDestinatarios(usuario) {
  try {

    const rows = await db.query(
      `SELECT destinatario_id,nombre_destinatario, correo_destinatario, banco_destino, tipo_cuenta
      FROM Destinatario where usuario = ? order by destinatario_id`,[usuario]
    );
    const data = helper.emptyOrRows(rows);

    return {
      data
    }

  } catch (error) {
    console.log(error);
  }
}

async function CrearDestinatario(DestinatarioRequest) {
  try {

    const result = await db.query(
      `INSERT INTO Destinatario 
      (nombre_destinatario, rut_destinatario, dv_destinatario, correo_destinatario,telefono_destinatario,banco_destino,tipo_cuenta,numero_cuenta,usuario) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        DestinatarioRequest.nombre_destinatario, DestinatarioRequest.rut_destinatario,
        DestinatarioRequest.dv_destinatario, DestinatarioRequest.correo_destinatario,
        DestinatarioRequest.telefono_destinatario, DestinatarioRequest.banco_destino,
        DestinatarioRequest.tipo_cuenta, DestinatarioRequest.numero_cuenta,DestinatarioRequest.usuario
      ]
    );

    let message = 'Hubo error al Insertar Destinatario';

    if (result.affectedRows) {
      message = 'Se inserto destinatario correctamente';
    }
    console.log(message);
    return { message };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  CrearDestinatario,
  BuscarDestinatarios
}
