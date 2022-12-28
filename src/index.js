const express = require('express');
const errorHandler = require('./middlewares/errorHandler');

const bodyParser = require('body-parser');
const port = 3000;

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static('public'));

//routes
const routes = require('./routes/index.route');
app.use(routes);

//jobs
const tmdbJob = require('./jobs/tmdbJob');
tmdbJob.syncPopularMovie();


// global error handler
app.use(errorHandler);

server = app.listen(port, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
})