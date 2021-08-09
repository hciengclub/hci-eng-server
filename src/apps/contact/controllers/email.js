const { sendEmail } = require('../services/email');
const { StatusCodes } = require('http-status-codes');
const EmailService = require('../services/email');

async function email(req, res) {
    const { name, email, message } = req.body;

    const emailService = new EmailService(name, email, message)
    const result = emailService.send();

    if (result.status === StatusCodes.OK)
        return res.status(result.status).send('ok')

    if (result.status === StatusCodes.BAD_REQUEST)
        return res.status(result.status).json(result.errors);

    return res.status(result.status).send('something went wrong...');
}

module.exports = email;