class NameValidator {
    static validate(name) {
        if (!name) {
            return { valid: false, errorMessage: 'name cannot be empty' };
        } else {
            if (!name.match(/^[a-zA-Z\s]+$/))
                return { valid: false, errorMessage: 'only letters in name' };
        }
        return { valid: true };
    }
}

module.exports = NameValidator;