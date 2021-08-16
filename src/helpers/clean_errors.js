function clean_errors(errors) {
    for (let error in errors) {
        if (errors[error] === null || errors[error] === undefined) {
            delete errors[error];
        }
    }
    return errors
}

module.exports = clean_errors;