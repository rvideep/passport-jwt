const express = require("express");
const path = require("path");
const passport = require("passport");

const Port = process.env.PORT || 3000;

const router = require("./routes");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

require("./config/database");

require("./config/passport")(passport);

app.use(router);

app.use(require("./lib/errorHandlerUtil"));

app.listen(Port);







