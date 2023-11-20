const express= require("express");
const router = express.Router();
const { createTeam,getTeam,getSingleTeam } = require('../controllers/teams.js');

router.route('/').post(createTeam).get(getTeam)
router.route('/:id').get(getSingleTeam)

module.exports=router