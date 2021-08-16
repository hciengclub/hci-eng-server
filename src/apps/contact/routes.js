const express = require('express');
const validate_recaptcha = require('../../middleware/validate_recaptcha');
const contact_router = express.Router();

const email = require('./controllers/email');

contact_router.post('/email', validate_recaptcha, email);

module.exports = contact_router;