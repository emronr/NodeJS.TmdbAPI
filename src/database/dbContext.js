const sql = require('mssql');
const config = require('config');

const dbConfig = config.get('databaseConfig');

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("Connect to database....");
        return pool;
    })
    .catch(err => {
        console.error("Database connection failed!. Bad config:", err);
    })

module.exports = { sql, poolPromise };