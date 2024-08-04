import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
}
},{timestamps:true})

  export const Testimonial =  mongoose.models.testimonial || mongoose.model("testimonial", testimonialSchema);

