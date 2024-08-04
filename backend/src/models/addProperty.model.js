import mongoose from "mongoose"

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
   type:String,
   required:true,
  },
  price: {
    type: String,
    required: true,
 
  },
  category: {
    type: String,
    required: true,
   // enum: ['House', 'Apartment', 'Condo', 'Land']
  },
  quantity: {
    type: String,
    required: true,
   // enum: ['House', 'Apartment', 'Condo', 'Land']
  },
 

  bookings:[{
    type:mongoose.Types.ObjectId,
    ref : "Booking"
  }],

 admin:{
  type:mongoose.Types.ObjectId,
  ref: "Admin",
  required:true,
 },

 username:{
  type:String
 },

 photos:[{
  
    type:String,
   required:true
  
 }],

 /* images: [{
    url: {
      type: String,
      required: true
    },
    description: {
      type: String,
      trim: true
    }
  }],*/
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt field before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

 export const AddProperty = mongoose.model('AddProperty', propertySchema);


