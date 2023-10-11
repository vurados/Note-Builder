const {User} = require('../models')
const Strategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
const fs = require('fs')
const path = require('path')
// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt

const pathToKey = path.join(__dirname, '..', 'Authentification/id_rsa_pub.pem') //im hardcoded this because it gives Serever/id_rsa_pub path TODO
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

const strategy = new Strategy(options, (payload, done) => {
    User.findByPk(payload.sub).then((user) => {
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    }).catch((err) => done(err, null))
})


module.exports=(passport) => {passport.use(strategy)}