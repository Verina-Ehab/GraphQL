import mongoose from "mongoose";

let todoSchema = mongoose.Schema({
 title:{
    type:String,
    required:[true,'title is required'],
    minLength:3,
    maxLength:20
 },

 status:{
    type:String,
    enum:['Pending','Completed','In Progress'],
    default:'Pending'
 },
 time: Date,
 userId:{
    type: mongoose.Schema.ObjectId,
    ref:'User'
 }


},{timestamps:true})

let todoModel = mongoose.model('Todo',todoSchema)

export {todoModel};