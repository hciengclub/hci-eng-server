const express = require('express');
const contactRouter = express.Router();

const email = require('./controllers/email');

contactRouter.post('/email', email);

module.exports = contactRouter;