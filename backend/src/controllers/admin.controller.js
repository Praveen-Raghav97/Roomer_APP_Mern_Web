import { Admin } from "../models/admin,model.js";
import { ApiError } from "../utils/apiError.js";
import { AddProperty} from "../models/addProperty.model.js";
import { ApiResponse } from "../utils/apiRes.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandlers.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

//Genrate AccessToken and RefreshToken

const generateAccessTokenAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);

   
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;

    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh token amd access token"
    );
  }
};










const registerAdmin = asyncHandler( async  (req , res) => {
    const {username ,email, password} = await req.body;

    if (
        [ email,password].some((field) => field?.trim() === " ")
      ) {
        throw new ApiError(400, "All fields are required");
      }

//find the user in db

      const existedUser = await Admin.findOne({
        $or: { email },
      });

       //check user is already exists

  if (existedUser) {
    throw new ApiError(409, "Admin with email is already exists");
  }
 
   const hashedpassword = bcrypt.hashSync(password , 10);

   const admin = await Admin.create({
        
    email,
    password : hashedpassword,
    username,
   
  });

 const createdAdmin = await admin.save();



 
  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while regeister the admin");
  }

  return res
  .status(201)
  .json(new ApiResponse(200, createdAdmin , "Admin Register Successfuly"))

})


const loginAdmin = asyncHandler(async (req , res) => {
    const {  email, password } = req.body;
    // console.log(email)
     //console.log(password)
   
     if (!email) {
       throw new ApiError(404, " email is required");
     }
   
     const admin = await Admin.findOne({
       $or: { email } ,
     });


     if (!admin) {
        throw new ApiError(404, "Admin does not exists");
      }

      const ispasswordValid = bcrypt.compareSync(password, admin.password);

  if (!ispasswordValid) {
    throw new ApiError(401, "Password is not valid");
  }

  
 const token = jwt.sign({id : admin._id}, process.env.REFRESH_TOKEN_SECRET ,{
    expiresIn: "20d" ,
 })

  return res
    .status(200)
   
    .json(
       new ApiResponse(201, {token , id:admin._id} , " Login Success")
    
    )

})


const getAllAdmin = asyncHandler(async (req , res)=>{
  let admins;
admins = await Admin.find();
if (!admins) {
  throw new ApiError(404, "Admins not Found")
}


return res
.status(200)
.json( new ApiResponse(201 , admins , "Admins finds Sucessfully "))
})

const getAdminBYId = asyncHandler(async (req , res) =>{
  const adminId = req.params.adminId;

  if (!adminId) {
    throw  new ApiError(404, "admin not found")
  }

  const admin = await Admin.findById(adminId).populate("AddedProperty");

  if (!admin) {
    throw new ApiError(404 , "No existing Admin")
  }

  return res
  .status(201)
  .json(
    new ApiResponse(200, admin, 'admin Found Success')
  )
})





export {
    registerAdmin,
    loginAdmin,
    getAllAdmin,
   getAdminBYId


}