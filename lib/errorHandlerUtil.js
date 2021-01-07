const errorHandler = (err, req, res, next) => {
    if(err)
        res.render("errorHandler",{error: "Oops! There is something Wrong!!"});
}

module.exports = errorHandler;