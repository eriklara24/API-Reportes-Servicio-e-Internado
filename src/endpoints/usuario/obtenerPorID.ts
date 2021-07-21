/* eslint-disable linebreak-style */

import database from '../../database';

export default async function obtenerPorID(req: any, res: any) {
  const { usuarioID } = req.params;
  const usuario = await database.almacenarUsuario.obtenerUsuario(usuarioID);

  return res.status(201).send(usuario);
}
