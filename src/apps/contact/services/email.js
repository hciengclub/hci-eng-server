const { StatusCodes } = require('http-status-codes');
const nodemailer = require('nodemailer');
const EmailValidator = require('../../../validators/email');
const NameValidator = require('../../../validators/name');


class EmailService {
    constructor(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }

    async send() {
        const validatedData = this._validate();
        if (!validatedData.valid)
            return { status: StatusCodes.BAD_REQUEST, errorMessage: validatedData.errorMessage };
        const transporter = new TransporterSingleton();
        const sendResult = await transporter.transporterInstance.sendMail(this._genMessage(), (err) => {
            console.log(err)
            return false;
        });

        if (sendResult === false)
            return { status: StatusCodes.INTERNAL_SERVER_ERROR };

        return { status: StatusCodes.OK };

    }

    _validate() {
        const validatedName = NameValidator.validate(this.name);
        const validatedEmail = EmailValidator.validate(this.email);

        if (!validatedName.valid)
            return { valid: false, errorMessage: validatedName.errorMessage };

        if (!validatedEmail.valid)
            return { valid: false, errorMessage: validatedEmail.errorMessage };


        return { valid: true };
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