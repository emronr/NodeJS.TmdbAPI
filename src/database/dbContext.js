const sql = require('mssql');
const nconf = require('nconf');

nconf
    .argv()
    .env()
    .file({ file: './config.json' });

// const config = nconf.get('databaseConfig');
const config = {
    user: "sa",
    password: "123456",
    database: "MovieLibrary",
    server: "localhost",
    port: 1433,
    options: {
        cryptoCredentialsDetails: {
            minVersion: "TLSv1"
        },
        trustServerCertificate: true
    },
    parseJSON: true
}

// sql connection
// console.log(config);

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("Connect to database....");
        return pool; 
    })
    .catch(err => {
        console.error("Database connection failed!. Bad config:", err);
    })

module.exports = { sql, poolPromise };