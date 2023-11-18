const express= require("express");
const router = express.Router();
const { getAllUsers,getUser,deleteUser,updateUser,createUser } = require('../controllers/user.js');

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports=router