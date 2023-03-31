const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]
        const TOKEN_SERECT = process.env.TOKEN_SERECT
        jwt.verify(token, TOKEN_SERECT, (err, user)=>{
            if(err) res.status(403).json("Token is not valid!")
            req.user = user
            next()
        })
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id  === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not alowed to do that!")
        }
    });
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not alwed to do that")
        }
    })
}