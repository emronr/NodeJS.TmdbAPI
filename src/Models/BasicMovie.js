class BasicMovie{
    constructor(obj){
       this.TmdbId = obj.id;
       this.Adult = obj.adult;
       this.Backdrop_path = obj.backdrop_path;
       this.Original_language = obj.original_language;
       this.Original_title = obj.original_title;
       this.Overview = obj.overview;
       this.Popularity = obj.popularity;
       this.Poster_path = obj.poster_path;
       this.Release_date = obj.release_date;
       this.Title = obj.title;
       this.Video = obj.video;
       this.Vote_average = obj.vote_average;
       this.Vote_count = obj.vote_count;
    }
}

module.exports = BasicMovie;