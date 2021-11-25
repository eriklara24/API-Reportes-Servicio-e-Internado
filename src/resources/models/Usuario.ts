/* eslint-disable linebreak-style */
export type Roles = 'prestador' | 'interno' | 'revisor' | 'administrador' | null;

interface Usuario {
  id: number;
  rol: Roles;
  nombre: string
  carrera: string
}

export default Usuario;
