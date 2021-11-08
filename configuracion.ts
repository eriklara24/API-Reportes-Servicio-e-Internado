const config = {
  ambiente: process.env.AMBIENTE || 'develop',
  host: 'localhost',
  port: 3000,
  database: {
    user: 'root',
    password: '12345678',
    name: 'Servicio_Medicina',
  },
  autenticacion: {
    algoritmo: process.env.ALGORITMO_AUTENTICACION || 'HS256',
    semilla: process.env.SEMILLA_AUTENTICACION || 'semillapruebaJKnas490nflz7y1g083gfdjlfuq49yfvmnp934yraiesjfn1lo4780efhdsafkjdq24t0eg',
  },
};

export default config;
