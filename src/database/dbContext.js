const sql = require('mssql');
var nconf = require('nconf');

nconf.argv().env();

nconf.file({ file: '../config.json' });
var config2 = nconf.get("databaseConfig");

var config = {
    user: 'sa',
    password: '160201070',
    database: 'MovieDictDb',
    server: 'DESKTOP-H7362TJ\\SQLEXPRESS',
    port: 1433,
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
        trustServerCertificate: true
    }
};


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