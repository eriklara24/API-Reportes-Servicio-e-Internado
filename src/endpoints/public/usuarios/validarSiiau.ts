import configuracion from '../../../../configuracion';

const axios = require('axios');
const xml2js = require('xml2js');

const opc: any = {
  hostname: configuracion.SIIAUHost,
  path: configuracion.SIIAUPath,
  head: { headers: { 'Content-Type': 'text/xml' } },
};

export default async function validarSiiau(usuario: string, password: string): Promise<string> {
  // eslint-disable-next-line operator-linebreak
  const requestXML: string =
  `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
      <valida xmlns="http://WebService/">
        <usuario xmlns="">${usuario}</usuario>
        <password xmlns="">${password}</password>
        <key xmlns="">${configuracion.SIIAUKey}</key>
      </valida>
    </Body>
  </Envelope>`;
  const dataXML = await axios.post(opc.hostname + opc.path, requestXML, opc.head);
  const objetoXML = await xml2js.parseStringPromise(dataXML.data);
  return objetoXML['S:Envelope']['S:Body'][0]['ns2:validaResponse'][0].return[0].split(',');
}
