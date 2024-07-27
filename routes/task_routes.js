// importing libraries
const express= require("express")

// importing files
const Task= require("../models/task")
const auth = require("../middleware/auth")

const route= express.Router()

route.post("/task",auth,async(req,res)=>{
    console.log(req.body)
    try{
        const task = new Task({...req.body,owner_id:req.user._id})
        // console.log(task);
         await task.save()
         res.status(201).send(task)
    }catch(e){
        console.log(e);
        res.status(500).send()
    }
})

// get route
route.get("/get_task",auth,async(req,res)=>{
    try{
        const task= await Task.find({owner_id:req.user._id})
        res.status(200).send(task)
    }catch(e){
        console.log(e);
        res.status(500).send()
    }
})


//  update task
route.patch("/update_task",auth,async(req,res)=>{
    try{
        console.log(req.body)
        const { _id, task: new_task, status: new_status }= req.body
        console.log({new_task,new_status})
        const tasks =await Task.findOne({_id:req.body._id})
        console.log(tasks)
        if(new_task)tasks.task=new_task
        if(new_status)tasks.status= new_status

        await tasks.save()
        res.status(200).send(tasks)

    }catch(e){
        console.log(e)
        res.status(500).send({
            status:"unsuccessfull",
            message:" unable to update",
            exports
        })
    }
})

// delete route


route.delete("/delete_task",auth,async(req,res)=>{
    try{
        console.log(req.body);
        const task = await Task.findByIdAndDelete({_id:req.body._id})
        console.log(task)
        res.status(200).send(task)
        
    }catch(e){
        console.log(e)
        res.status(500).send({
            status:"unsuccessfull",
            message:" unable to delete",
            e
        })
    }

})

// delete all
route.delete("/delete_task_all",auth,async(req,res)=>{
    try{
        console.log(req.user._id);
        await Task.deleteMany({ owner_id: req.user._id });
       
        res.status(200).send("all deleted")
        
    }catch(e){
        console.log(e)
        res.status(500).send({
            status:"unsuccessfull",
            message:" unable to delete",
            e
        })
    }

})
module.exports= route