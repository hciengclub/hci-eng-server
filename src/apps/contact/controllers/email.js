const { StatusCodes } = require('http-status-codes');
const EmailService = require('../services/email');

async function email(req, res) {
    const { name, email, message } = req.body;

    const email_service = new EmailService(name, email, message)
    const result = email_service.send();

    if (result.status === StatusCodes.OK)
        return res.status(result.status).send('ok')
        
    return res.status(result.status).json(result.errors);
}

module.exports = email;