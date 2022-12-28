const { poolPromise } = require('../database/dbContext');

var baseRepository = {
    get: async function (query) {
        const pool = await poolPromise;
        let response = await pool
            .request()
            .query(query);
        const data = response.recordset;
        return data;
    }
}

//  var query = 'SELECT TOP 6 * FROM MovieGenres';
//  baseRepository.get(query);

module.exports = baseRepository;
