const router = require("express").Router();

const routes = require("./users");

router.use("/", routes);

module.exports = router;