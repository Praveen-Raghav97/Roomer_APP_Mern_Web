import mongoose, { Schema } from "mongoose";

const  adminSchema = new Schema({
    email:{
     type:String,
     required:true,
     unique:true
    },
    password:{
     type:String,
    required:true
    },
    username:{
        type:String,
       
    },
    AddedProperty:[
        {
            type:mongoose.Types.ObjectId,
            ref: "AddProperty"

        }
    ]
},{timestamps:true})

export const Admin = mongoose.model('Admin', adminSchema);