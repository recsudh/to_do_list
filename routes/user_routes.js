// importing libraries
const express= require("express")

// importing files
const User= require("../models/user")
const auth= require("../middleware/auth")
const { JsonWebTokenError } = require("jsonwebtoken")

const route= express.Router()

route.post("/create",async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body.name||!req.body.email||!req.body.password){
            throw new Error("Please provide the required details!!")
        }
        const user= new User(req.body)
        await user.save()
        const token = await user.generateauthtoken()
        // await user.save()
        res.status(201).send({user,token})
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

// login route
route.post("/login",async(req,res)=>{
    try{
        console.log(req.body.email,req.body.password);
        const user = await User.findbycredentials(req.body.email,req.body.password)
        const token = await user.generateauthtoken()
        res.status(200).send({user,token})
       
        console.log(user)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

// logout routes
route.post("/logout",auth,async(req,res)=>{
    try{
        console.log(req.user.tokens);
        req.user.tokens= req.user.tokens.filter(token=>{
            return req.token===token
        })
        await req.user.save()
        res.status(200).send(req.user)
    }catch(e){
        console.log(e);
        res.status(500).send()
    }
})

// logout all
route.post("/logout",auth,async(req,res)=>{
    try{
        console.log(req.user.tokens);
        req.user.tokens=[]
        await req.user.save()
        res.status(200).send(req.user)
    }catch(e){
        console.log(e);
        res.status(500).send()
    }
})


// finding user by id

// route.get("/user/:_id",auth,async(req,res)=>{
//     try{
//         console.log(req.user)
//         const user= req.user
//         if(!user){
//             throw new Error("Invalid inputs!!")
//         }
//         res.status(200).send(user)
//     }catch(e){
//         console.log(e);
//         res.status(500).send({
//             success:false,
//             message:"Invalid inputs"
//         })
//     }
// })

// get 
route.get("/get",auth,async(req,res)=>{
    try{
        const user = req.user
        if(!user){
            throw new Error("No user found!!")
        }
        res.status(200).send(user)
        

    }catch(e){
        console.log(e);
        res.status({success:false,
            message:"Invalid inputs"
        }).send()
    }
})

// update or patch

route.patch("/update",auth,async(req,res)=>{
     try{
        const user = req.user
        const {name,email,password} = req.body
        console.log({name,email,password});
        if(name)user.name=name
        if(email)user.email=email
        if(name)user.password=password
        await user.save()
        res.status(201).send(user)
        
        res.status(200).send()

     }catch(e){
        console.log(e)
        res.status(500).send()
     }
})

// deleting user from database 
route.delete("/delete",auth,async(req,res)=>{
    try{
        const _id= req.user._id
        const deletedUser = await User.findByIdAndDelete(_id);
        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found' });
          }
      
        res.status(200).send(deletedUser)

    }catch(e){
        console.log(e)
        res.status(500).send()
     }
})

// exporting route
module.exports= route