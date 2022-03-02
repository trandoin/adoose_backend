const jwt = require('jsonwebtoken');

verifyJWT=(req,res,next)=>{
    try{
        console.log(req.body);
        const verify = jwt.verify(req.body.token,process.env.JWT_SECRET);
        req.user = 'verified';
        next();
    }
    catch(err){
        console.log(err);
        return res.status(200).send('Invalid Token');
    }
}

module.exports = {verifyJWT};