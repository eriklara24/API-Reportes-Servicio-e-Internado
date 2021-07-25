/* eslint-disable linebreak-style */
import database from '../../database';

export default async function obtenerPorID(req: any, res: any) {
  const { usuarioID } = req.params;
  database.almacenamientoUsuario.eliminarUsuario(usuarioID);

  return res.status(201).send({ code: 'Usuario eliminado con éxito' });
}
