const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'sql10.freemysqlhosting.net',
    user: env.DB_USER || 'sql10425613',
    port:env.port || 3306,
    password: env.DB_PASSWORD || 'qnx36bRF4Y',
    database: env.DB_NAME || 'sql10425613',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
  secret:'secretkey'
};


module.exports = config;