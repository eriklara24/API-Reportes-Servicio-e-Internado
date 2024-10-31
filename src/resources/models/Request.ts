import { Roles } from './Usuario';

interface SolicitudPersonalizada {
  headers: {
    autorizacion: string
  },
  usuario: {
    id: number,
    idServicio: number,
    rol: Roles,
    nombreUsuario: string,
  },
  params: any,
  query: any,
  body: any,
}

export default SolicitudPersonalizada;
