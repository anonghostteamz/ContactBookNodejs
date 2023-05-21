const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel") 


//@desc Get all contacts
//@route Get /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res)=>{
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})

//@desc Get contact
//@route Get /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id) 
    if(!contact){
        res.status(404) 
        throw Error("Contact Not Found") 
    }

    res.status(200).json(contact);
  })

//@desc Create Contact
//@route POST /api/contacts/
//@access public
const postContact = asyncHandler(async (req, res)=>{
    const {name , email , phone} = req.body; 
    if(!name || !email || !phone){
        res.status(400); 
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name, 
        email, 
        phone ,
        user_id: req.user.id
    })
    res.status(200).json(contact)
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const putContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id) 
    if(!contact){
        res.status(404) 
        throw Error("Contact Not Found") 
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User is not Authorized for this operation")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new : true} 
    )
    // console.log("updated contact ", updatedContact, req.params.body)
    res.status(200).json(updatedContact);
  })
  
//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id) 
    if(!contact){
        res.status(404) 
        throw Error("Contact Not Found") 
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User is not Authorized for this operation")
    }
    console.log("yes ", contact)
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact)
})

module.exports  = {getContacts, getContact, postContact, putContact, deleteContact} 