var jwt = require('jsonwebtoken'); 
require('dotenv').config()

function auth (req , res ,next) {
    const token = req.headers.authenticator;
     try {
        const verifyingtoken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifyingtoken.id; 
        next();
        
    } catch (err) {
        res.json({
            msg: "Please login again!",
            err : err
        });
    }
}

module.exports = { auth } 