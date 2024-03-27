
const jwt = require('jsonwebtoken');


// Verify token to Routes
const verifyToken = function (req, res, next) {
    let token = req.header('xxx-token');
    // console.log('verify-token', token);
    if (!token) {
        return res.status(401).json({
            resp: false,
            message: '접근 불가'
        });
    }
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || '청소년 톡Talk');
        req.idPerson = payload.idPerson;
        // console.log('verify-token req.idPerson', req.idPerson);
        next();
    }
    catch (err) {
        return res.status(500).json({
            resp: false,
            message: err
        });
    }
};

module.exports = verifyToken;
// Verify token to Socket 
// export const verifyTokenSocket = (token) => {
//     try {
//         const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'Frave_Social');
//         return [true, payload.idPerson];
//     }
//     catch (err) {
//         return [false, ''];
//     }
// };