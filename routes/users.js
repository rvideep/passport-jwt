const router = require("express").Router();
const {genPassword, validatePassword} = require("../lib/passUtility");
const User = require("../model/userModel");
const genJwt = require("../lib/jwtUtility");
const passport = require("passport");

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/secret", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.render("secret", {userDetails: req.user});
});

router.post("/register", (req, res, next) => {
    const {username, password} = req.body;
    const {salt, hash} = genPassword(password);

    User.findOne({username}, (err, userFound) => {
        if(err)
            next(err);
        else {
            if(!userFound) {
                const user = new User({
                    username,
                    salt,
                    hash
                });

                user.save().then((user) => {
                    const {token, expires} = genJwt(user);
                    res.json({success: true, user, token, expires});
                });
            } else {
                res.send("Users already exists!");
            }

        }
    });
});

router.post("/login", (req, res, next) => {
    const {username, password} = req.body;

    User.findOne({username}, (err, userFound) => {
        if(err) 
            next(err);
        else {
            const valid = validatePassword(password, userFound.salt, userFound.hash);
            if(valid) {
                const {token, expires} = genJwt(userFound);
                res.json({success: true, user: userFound, token, expires});
            }
            else 
                res.send("Invalid password!");
        }
    });
});


module.exports = router;