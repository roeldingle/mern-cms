const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const User = require('../models/userModels')

//@desc Get all users
//@route GET/api/users
//@access Private
const getUsers = asyncHandler(async(req,res) => {
    const user = await User.find()
    res.status(200).json({message: 'All user data', data: user})
})

//@desc Create user
//@route POST/api/users
//@access Private
const createUser = asyncHandler(async(req,res) => {
    /*destructure*/
    const {
        role,
        firstname, 
        lastname,
        email,
        password
        } = req.body;

    /*check sent data if available*/
    if(
        !firstname 
        || !lastname 
        || !email 
        || !password
        ){
        res.status(400);
        throw new Error('Missing field data');
    }

    //Check duplicate
    const hasDuplicate = await User.findOne({email}).lean().exec()

    if(hasDuplicate){
        return res.status(400).json({message: 'Duplicate email'})
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10) //salt rounds

    const userObject = {firstname, lastname, email, password: hashedPassword, role}

    //Craete and store new user
    const user = await User.create(userObject)

    if(user){
        return res.status(200).json({message: `New user ${email} created`, data: user})
    }else{
        return res.status(400).json({message: 'Invalid user data received'})
    }
})

//@desc Update user
//@route PUT/api/users/:id
//@access Private
const updateUser = asyncHandler(async(req,res) => {

    const userToUpdate = await User.findById(req.params.id)
    /*check if user exist*/
    if(!userToUpdate){
        res.status(400);
        throw new Error('User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({message: `Update user ${req.params.id} here`, data: updatedUser})
})

//@desc Delete user
//@route DELETE/api/users/:id
//@access Private
const deleteUser = asyncHandler(async(req,res) => {

    const userToDelete = await User.findById(req.params.id)
    /*check if user exist*/
    if(!userToDelete){
        res.status(400);
        throw new Error('User not found');
    }

    await userToDelete.remove()

    res.status(200).json({message: `Delete user ${req.params.id} here`, data: req.params.id})
})

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}