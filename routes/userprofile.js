const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/usercontroller')
var multer=require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix +file.originalname)
  }
})

var upload=multer({storage:storage});

const auth = require("../Middleware/authentication.js"); 


router.get("/:User_id",auth, controllers.get_user_data);   // Get data of User Accept _id 
router.put("/:User_id", auth,upload.single('ImageOfPost'), controllers.Update_User_data); //Upadete data of User
router.delete("/:User_id", auth, controllers.delete_user);  // delete User



module.exports = router;