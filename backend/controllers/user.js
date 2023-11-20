const User = require('../models/Users.js');



const getAllUsers = async(req,res)=>{
    const {finduser,domain,available,gender} = req.query;
    const queryObject = {};

    if (finduser){
        queryObject.first_name = { $regex: finduser, $options: 'i'};
    }
    if (domain){
        queryObject.domain = domain
        // console.log(queryObject.domain)
    }
    if (available){
        queryObject.available = available
    }
    if (gender){
        queryObject.gender = gender
    }
    try {
        const page = req.query.page || 1;
        const user = await User.find(queryObject).sort('id')
        res.status(200).json({user, len: user.length})

    } catch (error) {
        // console.log('Error fetching users:', error);
        res.status(500).json({ msg: 'Internal Server Error',error });
    }
}

const createUser = async (req,res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({user})   
    } catch (error) {
       res.status(500).json({msg: error}) 
    }
}
const getUser = async (req,res) => {
    try {

        const {id:userId} = req.params
        const user = await User.findOne({id:userId})
        if(!user){
           return res.status(404).json({msg : 'No task with id: ${userId}'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg : error})
    }
}
const updateUser = async (req,res) => {
    try {

        const {id:userId} = req.params
        const user = await User.findOneAndUpdate({id:userId}, req.body,{
            new: true,
            runValidators: true,
        })
        if(!user){
           return res.status(404).json({msg : 'No task with id: ${userId}'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg : error})
    }
}

const deleteUser = async (req,res) => {
    try {

        const {id:userId} = req.params
        const user = await User.findOneAndDelete({id:userId})
        if(!user){
           return res.status(404).json({msg : 'No task with id: ${userId}'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg : error})
    }
}


module.exports={getAllUsers,createUser,getUser,deleteUser,updateUser}