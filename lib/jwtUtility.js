const jwt = require("jsonwebtoken");
//const fs = require("fs");
//const path = require("path");
require(dotenv).config();

const genJwt = (user) => {
    const {_id} = user;

    const payload = {
        sub: _id,
        iat: Date.now()
    }

    const expiresIn = "1d";

    const privateKey = process.env.PRI_KEY;

    //const privateKey = fs.readFileSync(path.join(__dirname, "../privateKey.pem"), 'utf-8');
    const token = jwt.sign(payload, privateKey, {expiresIn: expiresIn, algorithm: "RS256"});

    return {
        token: "Bearer " + token,
        expires: expiresIn
    }

}

module.exports = genJwt;
