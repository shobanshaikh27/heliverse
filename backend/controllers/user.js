const User = require('../models/Users');

const getAllUsers = async(req,res)=>{
    console.log("penco")
    try {
        const user = await User.find({})
        res.status(200).json({user})

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports={getAllUsers}