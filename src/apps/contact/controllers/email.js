const { sendEmail } = require('../services/email');
const { StatusCodes } = require('http-status-codes');
const EmailService = require('../services/email');

async function email(req, res) {
    const { name, email, message } = req.body;

    const emailService = new EmailService(name, email, message)
    const result = await emailService.send();

    if (result.status === StatusCodes.OK)
        return res.status(result.status).send('ok')

    return res.status(result.status).send(result.errorMessage);

}

module.exports = email;