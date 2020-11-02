'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mongoose schema for demo object

let DemoSchema = new Schema({
    title:{
        type:String,
        required:"title is missing"
    },
    description:{
        type:String,
        required:"description is missing"
    },
    duedate:{
        type:Date,
        required:"duedate is missing"
    },
    modifiedDate:{
        type:Date,
        default:function(){
            return Date.now();
        }
    },
    isdone:{
        type:Boolean
    }
},
{
    versionKey:false
});

DemoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

DemoSchema.set('toJSON',{
    virtuals:true
});

module.exports=mongoose.model('demo',DemoSchema);