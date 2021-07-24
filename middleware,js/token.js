var jwt = require('jsonwebtoken');

module.exports = {
    validateToken: async (req, res, next) => {
        const token = req['headers']['authorization'];
        try {
            var decoded = await jwt.verify(token.split(' ')[1],'assignment');
            req.user = decoded;
            next();
            return
        } catch (err) {
            console.log(err)
            // next(err)
            return res.status(400).json({
                message:"Please provide Valid JWT Token"
            })
        }
    },
}