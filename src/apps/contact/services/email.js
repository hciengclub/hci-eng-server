const { StatusCodes } = require('http-status-codes');
const nodemailer = require('nodemailer');
const cleanErrors = require('../../../helpers/clean_errors');
const isEmpty = require('../../../helpers/is_empty');
const EmailValidator = require('../../../validators/email');
const NameValidator = require('../../../validators/name');


class EmailService {
    constructor(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }

    send() {
        const errors = this._validate();
        if (!isEmpty(errors))
            return { status: StatusCodes.BAD_REQUEST, errors: { 'errors': errors } };

        const transporter = new TransporterSingleton();
        const sendResult = transporter.transporterInstance.sendMail(this._genMessage(), (err) => {
            return false;
        });

        if (sendResult === false)
            return { status: StatusCodes.INTERNAL_SERVER_ERROR, errors: { error: 'failed to send email' } };

        return { status: StatusCodes.OK };

    }

    _validate() {
        let errors = {};
        errors['name'] = NameValidator.validate(this.name);
        errors['email'] = EmailValidator.validate(this.email);

        return cleanErrors(errors);
    }

    _genMessage() {
        return {
            from: this.name,
            to: process.env.HCIENG_EMAIL,
            subject: 'Webiste Contact Form Submission',
            html: `
                <p>Name: ${this.name}</p>
               <p>Email: ${this.email}</p>
               <p>Message: ${this.message}</p>
               `,
        };
    }
}

class TransporterSingleton {
    static transporterInstance;

    constructor() {
        if (this.transporterInstance)
            return transporterInstance;

        this.transporterInstance = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.HCIENG_EMAIL,
                pass: process.env.HCIENG_EMAIL_PASS,
            },
        });
    }
}


module.exports = EmailService;