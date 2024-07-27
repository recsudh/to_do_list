const jwt = require("jsonwebtoken")
const User = require("../models/user")

const auth = async(req,res,next)=>{
    // console.log(req.headers);

    try{const token = req.header("Authorization").replace("Bearer ","")
    console.log(token)
    const verify = await jwt.verify(token,process.env.JWT_SECRET)
    console.log(verify)
    const user=await  User.findOne({_id:verify._id})

    if(!user){
        throw new Error({
            status:false,
            error:" no user found!!"
        })
    }
    // console.log(user);
    req.user= user
    req.token= token
    next()
    }
    catch(e){
        res.status(500).send({
            status:false,
            error:" no user found!!",
            e
        })
    }
}

module.exports= auth