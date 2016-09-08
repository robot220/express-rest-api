const customHeaders = (req, res, next) => {
    res.header("Test-header", '10');
    next();
};

module.exports = customHeaders;