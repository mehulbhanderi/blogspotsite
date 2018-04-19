let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema(
    {
        user: {
            type:String,
            required:true
        },
        questionTopic:{
            type:String,
            required:true
        },
        question:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now(),
        },
        status:{
            type:Boolean,
            default:true
        }
    });

let Question = mongoose.model('Question', UserSchema)
module.exports = {Question};