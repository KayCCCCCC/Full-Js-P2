
const jwt = require('jsonwebtoken');

class Token {
    static async generateAccessToken(payload) {
        return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
            expiresIn: '1d',
        });
    }

    static async generateRefreshToken(payload) {
        return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
            expiresIn: '30d',
        });
    }
}

module.exports = Token

