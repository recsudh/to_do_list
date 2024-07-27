const error= async (error,req,res,next)=>{
    res.status(500).send({
        success:false,
        message:"spmething went wrong",
        error,

    })
    
}
module.exports= error