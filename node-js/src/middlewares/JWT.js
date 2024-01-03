const jwt = require('jsonwebtoken');
require('dotenv').config();
class token {
    static createToken() {
        let payload = { name: 'JWT', course: 'Full_Js' }
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        console.log('>>> check token: ', token);
        return token;
    }

    static vertifyToken(token) {
        let key = process.env.JWT_SECRET;
        let data = null;
        try {
            let decoded = jwt.verify(token, key);
            data = decoded
            console.log('>>> decoded:', data)
        } catch (error) {
            console.log(error)
        }
        return data
    }
}
module.exports = token;

