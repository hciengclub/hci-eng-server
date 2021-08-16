const express = require('express');
const validateReCaptcha = require('../../middleware/validate_recaptcha');
const contactRouter = express.Router();

const email = require('./controllers/email');

contactRouter.post('/email', validateReCaptcha, email);

module.exports = contactRouter;