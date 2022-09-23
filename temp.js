// const sql = require('mssql');
// var nconf = require('nconf');

// nconf.argv().env();

// nconf.file({ file: '../config.json' });
// var config2 = nconf.get("databaseConfig");

// var config = {
//     user: 'sa',
//     password: '160201070',
//     database: 'MovieDictDb',
//     server: 'DESKTOP-H7362TJ\\SQLEXPRESS',
//     port: 1433,
//     options: {
//         cryptoCredentialsDetails: {
//             minVersion: 'TLSv1'
//         },
//         trustServerCertificate: true
//     }
// };


// // sql connection
// // console.log(config);
// const poolPromise = new sql.ConnectionPool(config)
//     .connect()
//     .then(pool => {
//         console.log("Connect to database....");
//         return pool;
//     })
//     .catch(err => {
//         console.error("Database connection failed!. Bad config:", err);
//     })

// module.exports = { sql, poolPromise };





// const { poolPromise } = require('../database/dbContext');

// var baseRepository = {
//     get: async function (query) {
//         const pool = await poolPromise;
//         let response;

//         await pool
//             .request()
//             .query(query, (err, recordSets) => {
//                 if (err) {
//                     console.error(err);
//                 }
//                 else {
//                     console.dir(recordSets.recordset);
//                     response = recordSets;
//                 }
//             })
//         return response;
//     }
// }

// //  var query = 'SELECT TOP 6 * FROM MovieGenres';
// //  baseRepository.get(query);

// module.exports = baseRepository;
