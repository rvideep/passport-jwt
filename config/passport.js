const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//const fs = require("fs");
//const path = require("path");
const User = require("../model/userModel");
require("dotenv").config();


//const pubKey = fs.readFileSync(path.join(__dirname, "../publicKey.pem"), 'utf-8');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //secretOrKey: pubKey,
    secretOrKey: process.env.PUB_KEY,
    algorithm: ["RS256"]
}

const verifyCallBack = (jwt_payload, done) => {
    User.findOne({_id: jwt_payload.sub}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}
const jwtStrategy = new JwtStrategy(opts, verifyCallBack);


module.exports = (passport) => {
    passport.use(jwtStrategy);
}
