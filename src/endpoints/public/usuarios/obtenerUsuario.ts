/* eslint-disable linebreak-style */
import baseDatos from '../../../database';
import Usuario from '../../../resources/models/Usuario';

export default async function crearUsuario(req: any, res: any) {
  const {
    usuario,
  } = req;

  try {
    const usuarioCompleto: Usuario = await baseDatos
      .almacenamientoUsuario.obtenerUsuario(usuario.id);
    return res.status(201).send(usuarioCompleto);
  } catch (err) {
    return res.status(500).send({ codigo: 'ERROR_DE_BASE_DE_DATOS' });
  }
}
