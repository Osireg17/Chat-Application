const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/env.json');

module.exports = context => {
    if(context.req && context.req.headers.authorization) {
        const token = context.req.headers.authorization.split('Bearer ')[1]; //This just gets the token from the header
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if(err) {
                throw new AuthenticationError('Unauthenticated');
            }
            context.user = decodedToken;

        })
    }
    return context;

}