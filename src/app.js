const express = require("express");
const app = express();
const cors = require("cors");

const { settings } = require("./hcieng/settings");
const contact_router = require("./apps/contact/routes");
const validate_client_api_tkn = require("./middleware/validate_client_api_tkn");

function init() {
    init_middleware();
    init_routes();
}

function init_middleware() {
    console.log(settings.CLIENT_ORIGIN);
    app.use(cors({ origin: settings.CLIENT_ORIGIN, credentials: true }));
    app.use(express.json());
    app.use(validate_client_api_tkn);
}

function init_routes() {
    app.use('/contact', contact_router);
}

init();

module.exports = app;