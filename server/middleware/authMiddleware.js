import jwt from 'jsonwebtoken'

const auth = (req, res, next)=>{

    const token = req.headers.authorization;
    try{
        jwt.verify(token, process.env.S_KEY)
        next()
    }
    catch(err){
        res.json({sucess: false, message:"invalid token"})
    }
}

export default auth