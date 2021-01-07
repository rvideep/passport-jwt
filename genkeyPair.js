const crypto = require("crypto");
const fs = require("fs");

function genKeyPair() {
    const keys = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,

        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },

        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });

    fs.writeFileSync(__dirname + "/privateKey.pem", keys.privateKey);
    fs.writeFileSync(__dirname + "/publicKey.pem", keys.publicKey);

}

genKeyPair();