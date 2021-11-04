const config = {
  host: 'localhost',
  port: 9000,
  database: {
    user: 'root',
    password: 'dolphR0ot',
    name: 'Servicio_Medicina',
  },
  autenticacion: {
    algoritmo: process.env.ALGORITMO_AUTENTICACION || 'HS256',
    semilla: process.env.SEMILLA_AUTENTICACION || 'semillapruebaJKnas490nflz7y1g083gfdjlfuq49yfvmnp934yraiesjfn1lo4780efhdsafkjdq24t0eg',
  },
};

export default config;
