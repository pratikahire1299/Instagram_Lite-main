const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/postcontroller')

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
// router.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// })

// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// router.post('/cool-profile', cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// })



const auth = require("../Middleware/authentication.js"); 

router.get("/:User_id",auth, controllers.get_user_posts);   // Get posts of User Accept:user: _id

router.post("/:User_id", auth, upload.single('ImageOfPost'), controllers.create_user_post); //ADD Post of User Accept:user: _id
router.delete("/:Post_id", auth, controllers.delete_user_post); // delete  post of User required Accept: post: _id
router.patch("/:Post_id",auth, upload.single('ImageOfPost'),controllers.Update_User_post); //Update any post  Accept: Post: _id  
router.delete("/:User_id/:all", auth, controllers.delete_all_user_post);  // delete  post of User required Accept: user: _id

// router.post('/:User_id',auth, upload.single('productImage'), function (req, res, next) {
  
// var imagdata=req.file;
//   console.log(imagdata);
//   ;
// })
module.exports = router;