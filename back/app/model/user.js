let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema(
    {
        fName: {
            type:String,
            required:true
        },
        lName:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        dob:{
            type:Date,
            required:true
        },
        pic:{
            type:String,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

    });

let User = mongoose.model('User', UserSchema)
module.exports = {User};