const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/loginRegisterController')
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

router.post("/Register", upload.single('UserProfile'),controllers.User_Register);
router.post("/Login", controllers.User_Login);


module.exports = router;