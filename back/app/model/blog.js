let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema(
    {
        user: {
            type:String,
            required:true
        },
        blogTitle:{
            type:String,
            required:true
        },
        blogTopic:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        Date:{
            type:Date,
            default:Date.now(),
        },
        likes:{
            type: Array
        },
        status:{
            type:Boolean,
            default:true
        }
    });

let Blog = mongoose.model('Blog', UserSchema)
module.exports = {Blog};