
const { StatusCodes } = require("http-status-codes");

function validate_client_api_tkn(req, res, next) {
    if (!is_token_valid(req.headers.authorization))
        return res.status(StatusCodes.UNAUTHORIZED).send('invalid api token');
    next();
}

function is_token_valid(tkn) {
    return tkn === process.env.HCI_ENG_API_TKN;
}

module.exports = validate_client_api_tkn;