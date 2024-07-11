// config/db.js
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  //here I added port which is usee for only wise grab web
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Use encryption
    enableArithAbort: true,
    trustServerCertificate: true, // Add this line to trust the self-signed certificate
    connectionTimeout: 30000,
  },
};

sql.on("error", (err) => {
  console.error("SQL Error:", err);
});

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed: ", err));

module.exports = {
  sql,
  poolPromise,
};
