const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    name : {
        type: "String", 
        require: [true, "Please add your contact name"]
    },
    email : {
        type: "String", 
        require: [true, "Please add your contact email"]
    },
    phone : {
        type: "String", 
        require: [true, "Please add your contact phone number"]
    },
}, {
    timeStamps: true
})

module.exports = mongoose.model("Contact", contactSchema) 