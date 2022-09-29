const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);
app.use(express.static('public'));

//routes
var routes = require('./routes/index.route');
app.use(routes);

//jobs
var tmdbJob = require('./jobs/tmdbJob');
//tmdbJob.getMovies();

var server = app.listen(port, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
})