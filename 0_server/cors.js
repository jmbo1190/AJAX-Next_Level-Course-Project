function corsResolver(req, res, next){

    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // server of our front-end
    next();

}

module.exports = corsResolver;

