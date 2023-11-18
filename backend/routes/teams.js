const express= require("express");
const router = express.Router();
const { createTeam,getTeam } = require('../controllers/teams.js');

router.route('/').post(createTeam)
router.route('/:id').get(getTeam)

module.exports=router