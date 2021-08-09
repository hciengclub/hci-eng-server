const express = require("express");
const app = express();
const cors = require("cors");

const { settings } = require("./hcieng/settings");
const contactRouter = require("./apps/contact/routes");
const validateClientApiTkn = require("./middleware/validate_client_api_tkn");

function init() {
    initMiddleware();
    initRoutes();
}

function initMiddleware() {
    app.use(cors({ origin: settings.CLIENT_ORIGIN, credentials: true }));
    app.use(express.json());
    app.use(validateClientApiTkn);
}

function initRoutes() {
    app.use('/contact', contactRouter);
}

init();

module.exports = app;