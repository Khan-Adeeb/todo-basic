var jwt = require('jsonwebtoken'); 
const JWT_SECRET = "safepassword" ;

function auth (req , res ,next) {
    const token = req.headers.authenticator;
     try {
        const verifyingtoken = jwt.verify(token, JWT_SECRET);
        req.userId = verifyingtoken.id; 
        next();
        
    } catch (err) {
        res.json({
            msg: "Please login again!",
            err : err
        });
    }
}

module.exports = { auth, JWT_SECRET } 