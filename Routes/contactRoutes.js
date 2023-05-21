const express = require("express") 
const router = express.Router() 
const validateToken = require("../middleware/validateTokenHandler") 
//we created a controller and pass the server calling code in there 
const {getContacts, getContact, postContact, putContact, deleteContact} = require("../controllers/contactController")

router.use(validateToken) 
//Its a get request and we already gave the url of api in server.js file so not define here again 
//Now we direct use the value coming from the controllerContact here 
router.route("/").get(getContacts)

router.route("/:id").get(getContact);

router.route("/").post(postContact)

router.route("/:id").put(putContact);
  
router.route("/:id").delete(deleteContact)

module.exports = [router] 