function ErrorHandler(error, req, res, next) {
    res.status(error.status || 500);
    res.send({ "isSuccess": false, "message": error.message || "Internal Server Error" });
}

module.exports = ErrorHandler;