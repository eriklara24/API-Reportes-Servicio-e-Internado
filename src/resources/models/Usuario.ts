/* eslint-disable linebreak-style */
export type Roles = 'prestador' | 'interno' | 'revisor' | 'administrador' | null;

interface Usuario {
  id: number;
  rol: Roles;
  nombreUsuario: string
  contrasena: string
  preguntaSeguridadUno: string
  preguntaSeguridadDos: string
  nombre: string
  carrera: string
  codigo: number
}

export default Usuario;
