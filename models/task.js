const mongoose= require("mongoose")

const taskschema= mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const Task = mongoose.model("Task",taskschema)

module.exports= Task