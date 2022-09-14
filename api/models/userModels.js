const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email: {
        type:String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "member"
    },
    active:{
        type: Boolean,
        default: true
    },
},{
    autoIndex: true,
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
