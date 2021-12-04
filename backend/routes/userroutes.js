const express=require('express');
const{ registerUser, authUser, updateUserProfile }=require('../controllers/usercontrollers')
const router = express.Router();
const { protect } = require("../Middleware/authMiddleware");

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').post(updateUserProfile)
module.exports=router;