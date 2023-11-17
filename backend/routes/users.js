const express= require("express");
const router = express.Router();

const {getAllUsers}= require('../controllers/user')
router.route('/').get().post()
router.route('/:id').get(getAllUsers).patch().delete()

module.exports=router