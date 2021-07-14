// El parámetro req o request puede contener cualquier cosa, por ahora contiene lo default,
// pero puede que después lo personlizemos para solictar a front que nos mande cierto formato,
// con mas campos

import database from '../../database';
import ItemNotFound from '../../database/errors/ItemNotFound';

export default async function obtenerPorID(req: any, res: any) {
  const { dummyID } = req.params;
  database.dummyStore.getDummy(dummyID, (err, dummy) => {
    // Notese como cambia el código de respuestas
    if (!err) {
      return res.status(201).send({ dummy });
    }

    if (err instanceof ItemNotFound) {
      return res.status(404).send({ code: 'NO_SE_ENCONTRO_EL_DUMMY' });
    }

    console.log(dummy);
    return res.status(500).send({ code: 'ERROR_INESPERADO' });
  });
}
