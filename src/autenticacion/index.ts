import config from '../../configuracion';
import _Usuario, { Roles as _Roles } from '../resources/entities/Usuario';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

interface TokenUsuario {
  usuario: {
    id: number,
    idServicio: number,
    rol: _Roles,
    nombreUsuario: string,
  }
  exp: number
}

class Autenticacion {
  algoritmo = config.autenticacion.algoritmo;
  secret = config.autenticacion.semilla;

  crearToken(usuario: _Usuario, idServicio) {
    const dataToSign = {
      usuario: {
        id: usuario.id,
        idServicio,
        rol: usuario.rol,
        nombreUsuario: usuario.nombreUsuario,
      },
      exp: this.calcularTiempoExpiracion(),
    };

    return jwt.sign(dataToSign, this.secret, { algorithm: this.algoritmo });
  }

  jwtAutenticacion = (rolesAllowed: _Roles[]) => (req: any, res: any, next: any) => {
    const { authorization = '' } = req.headers || {};
    const [tokenType = '', jwToken = ''] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      return res.status(401).send({ code: 'UNAUTHORIZED' });
    }

    let tokenDecodificado: TokenUsuario = {
      usuario: {
        id: 0,
        idServicio: 0,
        rol: null,
        nombreUsuario: '',
      },
      exp: 0,
    };

    try {
      tokenDecodificado = jwt.verify(
        jwToken,
        this.secret,
        { algorithms: [this.algoritmo] },
      );
    } catch (error) {
      if (error.message === 'jwt expired') {
        return res.status(401).send({ code: 'JWT_EXPIRED' });
      }

      return res.status(401).send({ error, code: 'BAD_JWT_TOKEN' });
    }

    if (!rolesAllowed.includes(tokenDecodificado.usuario.rol)) {
      return res.status(401).send({ code: 'UNAUTHORIZED' });
    }

    req.usuario = {
      id: tokenDecodificado.usuario.id,
      idServicio: tokenDecodificado.usuario.idServicio,
      rol: tokenDecodificado.usuario.rol,
      nombreUsuario: tokenDecodificado.usuario.nombreUsuario,
    };

    return next();
  };

  // eslint-disable-next-line class-methods-use-this
  calcularTiempoExpiracion(): number {
    return Math.floor(Date.now() / 1000)
      + (120 * 60);
  }

  // eslint-disable-next-line class-methods-use-this
  contrasenaEsCorrecta(contrasena: string, hash: string): boolean {
    return bcrypt.compare(contrasena, hash);
  }

  // eslint-disable-next-line class-methods-use-this
  hash(password: string): string {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }
}

const autenticacion: Autenticacion = new Autenticacion();
export default autenticacion;
