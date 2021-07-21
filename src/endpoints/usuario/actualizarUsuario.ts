/* eslint-disable linebreak-style */
import database from '../../database';
import Usuario from '../../resources/entities/Usuario';

export default async function obtenerPorID(req: any, res: any) {
  const { id, rol } = req.body;
  database.almacenarUsuario.actualizarUsuario(new Usuario(id, rol));

  return res.status(201).send({ code: 'Usuario actualizado con éxito' });
}
