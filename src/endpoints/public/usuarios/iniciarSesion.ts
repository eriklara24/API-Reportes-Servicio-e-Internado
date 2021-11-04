import Usuario from '../../../resources/entities/Usuario';
import baseDatos from '../../../database';
import autenticacion from '../../../autenticacion';
import ServicioEInternado from '../../../resources/interfaces/ServicioEInternado';

export default async function (req: any, res: any) {
  const {
    body,
  } = req;

  const { nombreUsuario, contrasena } = body;

  let usuario: Usuario;
  let servicio: ServicioEInternado;
  const errorData: any = {};

  try {
    usuario = await baseDatos.almacenamientoUsuario.obtenerUsuarioPorNombreUsuario(nombreUsuario);
    servicio = await baseDatos.almacenamientoServicioGeneral.obtenerPorIdUsuario(usuario.id);
  } catch (error) {
    errorData.cause = error;
    errorData.code = 'USUARIO_NO_ENCONTRADO';
    errorData.status = 404;
    return res.status(errorData.status).send({ code: errorData.code });
  }

  const contrasenaEsCorrecta:boolean = await autenticacion
    .contrasenaEsCorrecta(contrasena, usuario.contrasena);

  if (!contrasenaEsCorrecta) {
    errorData.status = 401;
    errorData.code = 'CONTRASENA_INCORRECTA';
    return res.status(errorData.status).send({ code: errorData.code });
  }

  const token = autenticacion.crearToken(usuario, servicio.id);

  return res.status(201).send({ token });
}
