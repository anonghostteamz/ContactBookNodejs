const express = require("express") 
const { connect } = require("http2")
const connectDb = require("./configs/dbConnection")
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config() 
const app = express()
const port = process.env.port || 5001

connectDb()
//we use this so node will parse the data which comes in req on server side 
app.use(express.json()) 
//We are creating a middleware here and passing our routes file to access the apis 
app.use("/api/getAllContacts", require("./Routes/contactRoutes")) 
app.use("/api/users", require("./Routes/userRoutes")) 
app.use(errorHandler)

app.listen(port, ()=>{
    console.log("server starts running ", port) 
})


//MiddleWare 
//We are using middleware in pages to run a page in between the other page, lets suppose 
//we want to go to users page but before that we want to check if user is authenticated 
//then we can create a auth middleware and put it in between 
//we can use middleware using two methods , 
// - app.use(middleWare()) 
// - app.get("/", middleware, (req, res)=>{}) 
