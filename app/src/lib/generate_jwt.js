
const jwt = require('jsonwebtoken');
// Generate new Json Web Token 
const generateJsonWebToken = (idPerson) => {
    try {
        return jwt.sign({ idPerson }, process.env.TOKEN_SECRET || '청소년 톡talk', {
            expiresIn: '24h'
        });
    }
    catch (err) {
        return 'Jwt 생성 시 오류 - 토큰';
    }
};

module.exports = generateJsonWebToken
