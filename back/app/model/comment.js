let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema(
    {
        user: {
            type:String,
            required:true
        },
        blog:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        },
        Date:{
            type:Date,
            default:Date.now(),
        },
        status:{
            type:Boolean,
            default:true
        }
    });
let BlogComment = mongoose.model('BlogComment', UserSchema)
module.exports = {BlogComment};