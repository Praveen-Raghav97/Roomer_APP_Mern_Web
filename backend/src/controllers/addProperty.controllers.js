import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/apiError.js";
import { AddProperty} from "../models/addProperty.model.js";
import { Admin} from "../models/admin,model.js";
import { ApiResponse } from "../utils/apiRes.js";
import {uploadOnCloudinary} from '../utils/cloudniray.js'
import mongoose from "mongoose";
import jwt  from "jsonwebtoken";



 const registerProperty = asyncHandler(async(req, res) =>{
 const extreactToken = req.headers.authorization.split(' ')[1]; //Bearer token
 if (!extreactToken && extreactToken.trim() === "") {
  throw new ApiError(404 , "please authorize admin yourself..")


 }
  //console.log(extreactToken)
 //console.log( 'token :',extreactToken)
 let adminId;

 jwt.verify(extreactToken, process.env.REFRESH_TOKEN_SECRET, (err , decrypted) =>  {
  if (err) {
   throw new ApiError(400 ,`${err.message}` , "token does not match") ;
  }else{
    adminId = decrypted.id;
    return ;
  }
})


    //Get User Info From frontend
  const {title , username , description , price, location ,quantity , category , rooms} = req.body;
 
  

  if (
    [ title , username , description , price, location ,quantity , category , rooms].some((field) => field?.trim() === " ")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const files = req.files;
 const paths =  req.files.map(file => file.path);
 console.log(paths)

const uploadPromises =  paths.map(filePath => {
  return uploadOnCloudinary(filePath);
});

const upload = await Promise.all(uploadPromises);

  if(!upload){
    throw new ApiError(404, " property photos not found Not Found")
  }


 
  
 
  
  

  console.log(upload)

 // if (!photos) {
  //  throw new ApiError(404, " photos not found Not Found")
  //}

  //const propertyPhotos = req.files.map((file) => file.path);
 //console.log(propertyPhotos);

 //if(!propertyPhotos){
 // throw new ApiError(404, "Property photos not found Not Found")
 // }

  
    
   // const  photos = await uploadOnCloudinary(propertyPhotos);


    //if(!photos){
   //}
  

  


 

 

 


 

 

    //create user object in db

    let   property ;

    property = new AddProperty ({
        
      title , username , description , price, location ,quantity , category , rooms , admin:adminId,photos:upload.url,


    })

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId)
    session.startTransaction()
    await property.save({session})
    adminUser.AddedProperty.push(property)
    await adminUser.save({session})

    await session.commitTransaction();

      if (!property) {
        throw new ApiError(500, "Something went wrong while regeister the your property");
      }

      return res
      .status(201)
      .json(new ApiResponse(200, property, "Property Register Successfuly"))


})

const getAllProperty = asyncHandler(async(req, res) =>{
  
  try {
    const   AllProperty =  await AddProperty.find({});

    if(!AllProperty){
      throw new ApiError(500, "Something went wrong loading  the All Property");
    }
    return res
    .status(201)
    .json(new ApiResponse(200, AllProperty , "Property fetched Successfuly"))


  } catch (error) {
    throw new ApiError(500, "Something went wrong loading  the Property"
       , error);
  }
})

const getPropertyByID = asyncHandler(async (req,res) => {
  const id = req.params.id;


 // console.log(req.body.id)
 // console.log(req.params)

  if (!mongoose.Types.ObjectId.isValid(id)) {
   throw new ApiError(400 , "Invalid Id")
  }

  const property = await AddProperty.findById(id);
  if (!property) {
    throw new ApiError(404 , "Property not Found")
  }

  return res
  .status(201)
  .json(new ApiResponse(200 , property , "Property Found Success."))
})


const PropertyByCategory= asyncHandler(async (req , res) => {
  const {category} = req.query;

  if (!category) {
    throw new ApiError(404, "This category is not found")
  }
  const query = category ? { category } : {};
    const properties = await AddProperty.find(query);
     
    if (!properties) {
      throw new ApiError(404 , "Property is not found")
    }

    return res
    .status(201)
    .json(new ApiResponse(200, properties , "Properties found successFully"))
})
const PropertiesByAdminId = asyncHandler(async (req,res) =>{
  const  adminId  = req.params;
   //console.log(req.params)

   if (!adminId) {
    throw new ApiError(404, "Admin not found");

   }

   const properties = await AddProperty.find({ adminId: adminId });

   if (!properties) {
    throw new ApiError(404,"there is no Property")

   }

   return res
   .status(201)
   .json( new ApiResponse(200, properties , "Property Found SucessFully"))
})


const PropertyDelete = asyncHandler(async (req,res) =>{
  const id = req.params.mongoId;
  console.log(req.params)
  console.log(req.params.mongoId)
  if (!id) {
    throw new ApiError(404 , "Something went wrong")
  } 

  const deleteProperty = await AddProperty.findByIdAndDelete(id);
  
  if (!deleteProperty) {
    throw new ApiError(404 , "Property not found")
  }

  return res
  .status(200)
  .json( new ApiResponse(201, deleteProperty , "Property delete successfully"))
})


export{
    registerProperty,
    getAllProperty,
    getPropertyByID,
  PropertyByCategory,
  PropertiesByAdminId,
  PropertyDelete,
}