const mongoose= require("mongoose")

const db =async ()=>{
    try{
        const connection= await  mongoose.connect(process.env.URL)
        if(connection){
            console.log(`connection established @ ${mongoose.connection.host} ` );
        }

    }catch(e){
     console.log(e);
    }
}
module.exports=db