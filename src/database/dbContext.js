const sql = require('mssql');
const nconf = require('nconf');

nconf.argv().env();

nconf.file({ file: './config.json' });
const config = nconf.get("databaseConfig");


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