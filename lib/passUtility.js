const crypto = require("crypto");

const genPassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return {
        salt,
        hash
    }
}

const validatePassword = (password, salt, hash) => {
    const hashGenerated = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === hashGenerated;
}

module.exports.genPassword = genPassword;
module.exports.validatePassword = validatePassword;
