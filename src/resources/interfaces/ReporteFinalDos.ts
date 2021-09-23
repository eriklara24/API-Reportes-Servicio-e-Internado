/* eslint-disable linebreak-style */

import ActividadesRealizadas from './ActividadesRealizadas';
import AtencionesRealizadas from './AtencionesRealizadas';

/* eslint-disable semi */
export default interface ReporteFinalDos {
    id: number;
    idServicio: number;
    metasAlcanzadas: string;
    metodologiaUtilizada: string;
    innovacionAportada: string;
    conclusiones: string;
    propuestas: string;
    actividadesRealizadas: ActividadesRealizadas[];
    atencionesRealizadas: AtencionesRealizadas[];
}
