function requestClient(req, res, next) {
    console.log(req.body);
    next()
}

module.exports = requestClient
