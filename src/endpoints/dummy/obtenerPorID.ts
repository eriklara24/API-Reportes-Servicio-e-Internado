// El parámetro req o request puede contener cualquier cosa, por ahora contiene lo default,
// pero puede que después lo personlizemos para solictar a front que nos mande cierto formato,
// con mas campos

import database from '../../database';

export default async function obtenerPorID(req: any, res: any) {
  const { dummyID } = req.params;

  database.dummyStore.getDummy(dummyID(), (dummy, err) => {
    if (!err) {
      return res.status(201).send({ dummy });
    }

    return res.status(500).send({ code: 'ERROR_INESPERADO' });
  });
}
