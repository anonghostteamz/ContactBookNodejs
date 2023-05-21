const mongoose = require("mongoose")

const userModelSchema = mongoose.Schema({
    username : {
        type: "String", 
        require: [true, "Please enter username"]
    },
    email : {
        type: "String", 
        require: [true, "Please enter email"],
        unique: [true, "Email address already taken"],
    },
    password : {
        type: "String", 
        require: [true, "Please enter password"]
    },
},{
    timeStamps: true
})

module.exports = mongoose.model("UserModel", userModelSchema)