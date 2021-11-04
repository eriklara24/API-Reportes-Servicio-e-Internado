/* eslint-disable linebreak-style */
import autenticacion from '../../../autenticacion';
import baseDatos from '../../../database';

export default async function crearUsuario(req: any, res: any) {
  const {
    usuario,
    body,
  } = req;

  const {
    contrasena,
    preguntaSeguridadUno,
    preguntaSeguridadDos,
    nombre,
    carrera,
    codigo,
  } = body;

  try {
    const usuarioCompleto = await baseDatos.almacenamientoUsuario.obtenerUsuario(usuario.id);

    if (usuarioCompleto.preguntaSeguridadUno !== preguntaSeguridadUno) {
      return res.status(400).send({ codigo: 'PREGUNTA_UNO_ES_INCORRECTA' });
    }

    if (usuarioCompleto.preguntaSeguridadDos !== preguntaSeguridadDos) {
      return res.status(400).send({ codigo: 'PREGUNTA_DOS_ES_INCORRECTA' });
    }

    const nuevoUsuario = await baseDatos.almacenamientoUsuario.actualizarUsuario({
      id: usuario.id,
      rol: usuario.rol,
      nombreUsuario: usuario.nombreUsuario,
      contrasena: autenticacion.hash(contrasena),
      preguntaSeguridadUno,
      preguntaSeguridadDos,
      nombre,
      carrera,
      codigo,
    });
    nuevoUsuario.contrasena = contrasena;
    return res.status(201).send(nuevoUsuario);
  } catch (err) {
    return res.status(500).send({ codigo: 'ERROR_INESPERADO' });
  }
}
