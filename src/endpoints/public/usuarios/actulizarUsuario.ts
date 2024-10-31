/* eslint-disable linebreak-style */
import autenticacion from '../../../autenticacion';
import baseDatos from '../../../database';
import Usuario from '../../../resources/models/Usuario';

export default async function crearUsuario(req: any, res: any) {
  const {
    body,
  } = req;

  const {
    nombreUsuario,
    contrasena,
    preguntaSeguridadUno,
    preguntaSeguridadDos,
    nombre,
    carrera,
    codigo,
  } = body;

  try {
    const usuarioCompleto = await baseDatos
      .almacenamientoUsuario.obtenerUsuarioPorNombreUsuario(nombreUsuario);

    if (usuarioCompleto.preguntaSeguridadUno !== preguntaSeguridadUno) {
      return res.status(400).send({ codigo: 'PREGUNTA_UNO_ES_INCORRECTA' });
    }

    if (usuarioCompleto.preguntaSeguridadDos !== preguntaSeguridadDos) {
      return res.status(400).send({ codigo: 'PREGUNTA_DOS_ES_INCORRECTA' });
    }

    const nuevoUsuario: Usuario = await baseDatos.almacenamientoUsuario.actualizarUsuario({
      id: usuarioCompleto.id,
      rol: usuarioCompleto.rol,
      nombreUsuario: usuarioCompleto.nombreUsuario,
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
