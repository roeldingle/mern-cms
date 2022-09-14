const asyncHandler = require('express-async-handler')

//@desc Get all users
//@route GET/api/users
//@access Private
const getUsers = asyncHandler(async(req,res) => {
    res.status(200).json({message: 'all users here'})
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
        !role
        || !firstname 
        || !lastname 
        || !email 
        || !password
        ){
        res.status(400);
        throw new Error('Missing field data');
    }

    res.status(200).json({message: 'Create a user here'})
})

//@desc Update user
//@route PUT/api/users/:id
//@access Private
const updateUser = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Update user ${req.params.id} here`})
})

//@desc Delete user
//@route DELETE/api/users/:id
//@access Private
const deleteUser = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Delete user ${req.params.id} here`})
})


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}