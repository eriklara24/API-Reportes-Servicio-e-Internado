/* eslint-disable linebreak-style */
import autenticacion from '../../../autenticacion';
import baseDatos from '../../../database';

export default async function crearUsuario(req: any, res: any) {
  const {
    body,
  } = req;

  const {
    rol,
    nombreUsuario,
    contrasena,
    preguntaSeguridadUno,
    preguntaSeguridadDos,
    nombre,
    carrera,
    codigo,
  } = body;

  try {
    const nuevoUsuario = await baseDatos.almacenamientoUsuario.crearUsuario({
      id: 0,
      rol,
      nombreUsuario,
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
    if (err.errno === 1062) {
      return res.status(400).send(err);
    }

    return res.status(500).send({ codigo: 'ERROR_INESPERADO' });
  }
}
