import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema( {
    property:{
        type:mongoose.Types.ObjectId,
        ref: "AddProperty",
      
    },
    username:{
       type:String,
       required:true
    },
    email:{
     type:String,
     required:true
    },
    phone:{
        type:Number,
        required:true,
    }

},{})

export const Booking = mongoose.model('Boking', bookingSchema);