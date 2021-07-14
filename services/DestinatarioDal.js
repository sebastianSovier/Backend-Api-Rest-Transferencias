const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function BuscarDestinatario(nombre_destinatario) {
    const rows = await db.query(
      `SELECT nombre_destinatario, correo_destinatario, banco_destino, tipo_cuenta
      FROM Destinatario where nombre_destinatario = ?`,
      [nombre_destinatario]
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }
  
  async function CrearDestinatario(DestinatarioRequest) {
    const result = await db.query(
      `INSERT INTO Paises 
      (nombre_destinatario, rut_destinatario, dv_destinatario, correo_destinatario,telefono_destinatario,banco_destino,tipo_cuenta,numero_cuenta) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        DestinatarioRequest.nombre_destinatario, DestinatarioRequest.rut_destinatario,
        DestinatarioRequest.dv_destinatario, DestinatarioRequest.correo_destinatario,
        DestinatarioRequest.telefono_destinatario, DestinatarioRequest.banco_destino,
        DestinatarioRequest.tipo_cuenta, DestinatarioRequest.numero_cuenta
      ]
    );
  
    let message = 'Hubo error al Insertar Destinatario';
  
    if (result.affectedRows) {
      message = 'Se inserto destinatario correctamente';
    }
  
    return { message };
  }
  
  module.exports = {
    CrearDestinatario,
    BuscarDestinatario
  }
