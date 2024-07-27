// packages
const mongoose= require("mongoose")
const bcryptjs= require("bcryptjs")
const validator= require("validator")
const jwt= require("jsonwebtoken")

const userschema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is Required!"],

    },
    email:{
        type:String,
        required:[true,"Email is required!"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email!")
            }
        }
    },
    password:{
        type:String,
        required:[true,"Password is required!"]
    },
    tokens:[
      {
          token:{
            type:String

        }
    }
    ]
},{
    timestamps:true

})

// middlewares

// generatig auth token by jwt
userschema.methods.generateauthtoken= async function(){
    const user = this
    if(!user){
        throw new Error("Invaid credentials!!")
    }
    // console.log(process.env.JWT_SECRET,{_id:user._id})
    const token =await  jwt.sign({_id:user._id},process.env.JWT_SECRET)
    console.log(token)

    user.tokens = user.tokens.concat({token})
    user.save()
    return token
}


// login verification
userschema.statics.findbycredentials=async function(email,password){
   
    const user = await User.findOne({email})
    console.log(user)
    if(!user){
        throw new Error("Inavlid details(user)!!")
    }
    console.log({password,pas:user.password})
    const is_match= await bcryptjs.compare(password,user.password)
    console.log(is_match);
    if(!is_match){
        throw new Error("Inavlid details(is_match)!!")
    }
  return user
}

// for hassing password
 userschema.pre("save", async function(next){
    const user = this
     if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8);
    }
    next()
 })


const User = mongoose.model("User",userschema)


module.exports=User