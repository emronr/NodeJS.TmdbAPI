var baseRepository = require('./baseRepository');
const { sql, poolPromise } = require('../database/dbContext');


var basicMovieRepository = {
    getAll: async () => {
        let query = 'select * from BasicMovies'
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset; });
            });
    },
    getById: async function (id) {
        let query = 'select * from BasicMovies where TmdbId =' + id;
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset; });
            });
    },
    getAllPaging: async function (size, currentPage) {
        let query = `SELECT 
                    bm.*,
                    (select
                        Id,
                        MovieTmdbId,
                        TmdbId
                        FROM MovieGenres 
                        WHERE MovieTmdbId = bm.TmdbId
                        FOR JSON AUTO) as MovieGenres
                FROM BasicMovies as bm
                ORDER BY (bm.Id)
                OFFSET ${(currentPage - 1) * size} ROWS FETCH NEXT ${size} ROWS ONLY
                FOR JSON AUTO
                `;
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .query(query)
                    .then(response => { return response.recordset[0]; });
            });
    },
    create: async function (basicMovie) {
        let query = `INSERT INTO
            BasicMovies(TmdbId,Adult,Backdrop_path,Original_language,Original_title,Overview,Popularity,Poster_path,Release_date,Title,Video,Vote_average,Vote_count)
            VALUES(
                @TmdbId,
                @Adult,
                @Backdrop_path,
                @Original_language,
                @Original_title,
                @Overview,
                @Popularity,
                @Poster_path,
                @Release_date,
                @Title,
                @Video,
                @Vote_average,
                @Vote_count
            )
        `;
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .input('TmdbId', basicMovie.TmdbId)
                    .input('Adult', basicMovie.Adult)
                    .input('Backdrop_path', basicMovie.Backdrop_path)
                    .input('Original_language', basicMovie.Original_language)
                    .input('Original_title', basicMovie.Original_title)
                    .input('Overview', basicMovie.Overview)
                    .input('Popularity', sql.Float, basicMovie.Popularity)
                    .input('Poster_path', basicMovie.Poster_path)
                    .input('Release_date', basicMovie.Release_date)
                    .input('Title', basicMovie.Title)
                    .input('Video', basicMovie.Video)
                    .input('Vote_average', sql.Float, basicMovie.Vote_average)
                    .input('Vote_count', sql.Int, basicMovie.Vote_count)
                    .query(query)
                    .then(response => { return response.recordset.data; });
            });
    },
    update: async function (basicMovie) {
        let query = `UPDATE BasicMovies
            SET
                Adult = @Adult,
                Backdrop_path = @Backdrop_path,
                Original_language = @Original_language,
                Original_title = @Original_title,
                Overview = @Overview,
                Popularity = @Popularity,
                Poster_path = @Poster_path,
                Release_date = @Release_date,
                Title = @Title,
                Video = @Video,
                Vote_average = @Vote_average,
                Vote_count = @Vote_count
            WHERE Id = @Id
        `;
        return await poolPromise
            .then(pool => {
                return pool
                    .request()
                    .input('Id', basicMovie.Id)
                    .input('Adult', basicMovie.Adult)
                    .input('Backdrop_path', basicMovie.Backdrop_path)
                    .input('Original_language', basicMovie.Original_language)
                    .input('Original_title', basicMovie.Original_title)
                    .input('Overview', basicMovie.Overview)
                    .input('Popularity', sql.Float, basicMovie.Popularity)
                    .input('Poster_path', basicMovie.Poster_path)
                    .input('Release_date', basicMovie.Release_date)
                    .input('Title', basicMovie.Title)
                    .input('Video', basicMovie.Video)
                    .input('Vote_average', sql.Float, basicMovie.Vote_average)
                    .input('Vote_count', sql.Int, basicMovie.Vote_count)
                    .query(query)
                    .then(response => { return response.recordset.data; });
            });
    }
}

//  basicMovieRepository.getById(1);
//basicMovieRepository.getAllPaging(20, 1);

module.exports = basicMovieRepository;