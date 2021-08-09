class NameValidator {
    static validate(name) {
        if (!name) {
            return 'name cannot be empty';
        } else {
            if (!name.match(/^[a-zA-Z\s]+$/))
                return 'only letters in name';
        }
    }
}

module.exports = NameValidator;