const express= require("express")
const db = require("../db/mongo")
// iporting files
const user_route=require("../routes/user_routes")
const task_routes=require("../routes/task_routes")
const error= require("../middleware/error")

const app = express()

// connecting database
db()

// middlewares
app.use(express.json())

app.use(user_route)
app.use(task_routes)
app.use(error)

// port
const port = process.env.PORT

app.listen(port,()=>{
    console.log( `port is on at ${port}`);
})