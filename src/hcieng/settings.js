let settings = {
    DEBUG: false,
    CLIENT_ORIGIN: ''
}

function initSettings() {
    require("dotenv").config();

    if (process.env.DEBUG === 'true')
        settings.DEBUG = true;
    else    
        settings.DEBUG = false;

    settings.PORT = process.env.PORT || '8080';

    if (settings.DEBUG) {
        settings.CLIENT_ORIGIN = 'http://localhost:3000';
    } else {
        settings.CLIENT_ORIGIN = 'https://www.hcieng.xyz';
    }
}

module.exports = { settings, initSettings };