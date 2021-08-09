
const { StatusCodes } = require("http-status-codes");

function validateClientApiTkn(req, res, next) {
    if (!isTokenValid(req.headers.authorization))
        return res.status(StatusCodes.UNAUTHORIZED).send('invalid api token');
    next();
}

function isTokenValid(tkn) {
    return tkn === process.env.HCI_ENG_API_TKN;
}

module.exports = validateClientApiTkn;