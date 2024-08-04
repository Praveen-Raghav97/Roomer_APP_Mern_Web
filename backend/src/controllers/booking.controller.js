import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/apiError.js";
import { Booking} from "../models/booking.model.js";
import { ApiResponse } from "../utils/apiRes.js";
import { AddProperty } from "../models/addProperty.model.js";
import { User } from "../models/users.model.js";
import mongoose from "mongoose";
import e from "express";

const addBooking = asyncHandler(async (req, res) =>{
    const {property , user} = req.body;

let existingProperty;
let existingUser;

existingProperty = await AddProperty.findById(property);
existingUser = await User.findById(user);

    if(!existingProperty){
        throw new ApiError("property not found")
    }
    
    if(!existingUser){
        throw new ApiError("user not found")
    }

    let booking ;
    try {
       booking = new Booking ({
        user,
        property
       })

       const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking)
        existingProperty.bookings.push(booking)
        await existingProperty.save({session})
        await existingUser.save({session})
        await booking.save({session})
        session.commitTransaction();
       
    } catch (error) {
        return console.log(error)
    }
    

    if(!booking){
        throw new ApiError(500 , "Something went wrong booking")
    }

    return res
    .status(201)
    .json(new ApiResponse(200, booking , "Booking Created SuccessFully"))
})

const SendRequest = asyncHandler(async (req , res) => {

     const {username , email , phone} = req.body;
   // console.log(req.body);
    if (
        [ email, username, phone].some((field) => field?.trim() === " ")
      ) {
        throw new ApiError(400, "All fields are required");
      }
    const request = await Booking.create({username , email , phone});



if (!request) {
 throw new ApiError(500, "Internal error")   
}

return res
.status(200)
.json( new ApiResponse(201 , request , "Request Send Successfully"))
     

})
export{
    addBooking,
    SendRequest,
}