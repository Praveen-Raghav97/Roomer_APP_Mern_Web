import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/apiRes.js";
import mongoose from "mongoose";

//Genrate AccessToken and RefreshToken

const generateAccessTokenAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh token amd access token"
    );
  }
};

// Register User 
const registerUser = asyncHandler(async(req, res) =>{

    //Get User Info From frontend
  const {username , email , password} = req.body;

  if (
    [ email, username, password].some((field) => field?.trim() === " ")
  ) {
    throw new ApiError(400, "All fields are required");
  }


//find the user in db

const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  //check user is already exists

  if (existedUser) {
    throw new ApiError(409, "User with username and email is already exists");
  }

    //create user object in db

    const user = await User.create({
        
        email,
        password,
        username,
      });


      const createdUser = await User.findById(user._id).select(
        "  -password -refreshToken "
      );

      if (!createdUser) {
        throw new ApiError(500, "Something went wrong while regeister the user");
      }

      return res
      .status(201)
      .json(new ApiResponse(200, createdUser , "User Register Successfuly"))


})

//Login User 

const loginUser = asyncHandler(async (req,res) => {

    const {  email, password } = req.body;
   // console.log(email)
    //console.log(password)
  
    if (!email) {
      throw new ApiError(404, "username or email is required");
    }
  // console.log(email);

    const user = await User.findOne({
      $or: { email } ,
    });

    if (!user) {
        throw new ApiError(404, "User does not exists");
      }

      const ispasswordValid = await user.isPasswordCorrect(password);

  if (!ispasswordValid) {
    throw new ApiError(401, "Password is not valid");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshTokens(user._id);

  const loggedInuser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200,
            {
                user: loggedInuser,
                accessToken,
                refreshToken,
        },
        "User LogIn Suceesfully "
    )
    )

})

// Loged out User

const logOutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
          $unset: {
            refreshToken:1, //  this removes the fields from documents
          },
        },
        {
          new: true,
        }
      );

      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged Out"));
})

//RefreshAccessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh toekn is expired and used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newrefreshToken } =
      await generateAccessTokenAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});


export {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
}