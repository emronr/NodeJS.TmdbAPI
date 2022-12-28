function ErrorHandler(error, req, res, next) {
    // try {
    //         next();
    // } catch (err) {
    //     res.status(Error.status || 500);
    //     res.send({ "status": false, "message": Error.message } || "Internal Server Error");
    // }
    const errMessage = "";

    res.status(error.status || 500);
    res.send({ "status": false, "message": error.message || "Internal Server Error" });

    // process.on('uncaughtExceptionMonitor', (err, origin) => {
    //     errMessage = err.message;
    // });

    // process.on('unhandledRejection', (reason, promise) => {
    //     errMessage = reason.message;
    // });
    // res.status(400).send({ "status": false, "message": errMessage } || "Internal Server Error");
}

module.exports = ErrorHandler;