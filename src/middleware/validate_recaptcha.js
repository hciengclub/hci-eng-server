const { StatusCodes } = require('http-status-codes');
require("es6-promise").polyfill();
require("isomorphic-fetch");

async function validate_recaptcha(req, res, next) {
    const { recaptcha_data } = req.body;

    const is_human = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha_data}`
    })
        .then(res => res.json())
        .then(json => json.success)
        .catch(_ => false)

    if (recaptcha_data === null || !is_human)
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: { recaptcha: 'error validating recaptcha' } });

    next();
}

module.exports = validate_recaptcha;