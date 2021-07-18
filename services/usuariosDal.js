const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function ObtenerUsuarios(){
  try {
  
  const rows = await db.query(
    `SELECT usuario_id, usuario, nombre_completo, correo, fecha_registro 
    FROM Usuarios order by usuario_id`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
    
} catch (error) {
    console.log(error);
}
}

async function ObtenerUsuario(usuario_id){
  try {
  
    const rows = await db.query(
        `SELECT usuario_id, usuario, nombre_completo,contrasena, correo, fecha_registro 
        FROM Usuarios where usuario = ? order by usuario_id`,
        [usuario_id]
    );
    const data = helper.emptyOrRows(rows);
      console.log("Data"+data);
    return {
      data
    }
      
  } catch (error) {
   console.log(error); 
  }
  }

async function CrearUsuario(UsuarioRequest){
  try {
   
  const result = await db.query(
    `INSERT INTO Usuarios 
    (usuario, contrasena, nombre_completo, correo) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
        UsuarioRequest.usuario, UsuarioRequest.contrasena,
        UsuarioRequest.nombre_completo, UsuarioRequest.correo
    ]
  );

  let message = 'Hubo error al Insertar pais';

  if (result.affectedRows) {
    message = 'Se inserto pais correctamente';
  }

  return {message};
   
} catch (error) {
 console.log(error);   
}
}

module.exports = {
    ObtenerUsuarios,
    ObtenerUsuario,
    CrearUsuario
}