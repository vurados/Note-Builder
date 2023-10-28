import * as passport from 'passport'
import * as LocalStrategy from 'passport-local'
import { verifyPassword } from '../passwordUtils'
const {User} = require("../../models")

const strategy = new LocalStrategy(
    (username, password, done) => {
        User.findOne({where: {username: username}}, (err, user) => {
            if (err) { return done(err) }
            if (!user) { return done(null, false) }
            
            const isValid = verifyPassword(password, user.hashedPassword, user.salt)

            if (isValid) { 
                return done(null, user)
            }else{
                return done(null, false)
            }
        })
    }
)

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    User.findByPk(userId).then((user) => {
        done(null, user)
    }).catch((err) => done(err))
})