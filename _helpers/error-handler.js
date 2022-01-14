module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    return res.status(500).json({ 
        message: (typeof err === 'string' ? err : err.message) 
    });
}