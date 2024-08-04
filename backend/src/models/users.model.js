import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const userSchema = new  Schema(
    {
        username: {
            type: String,
            required: true,
            
            trim: true,
            index: true,
            unique: true,
          },

          email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
          },
          password: {
            type: String,
            required: [true, 'password is required']
          },
          refreshToken: {
            type: String,
          },
          bookings:[
            {
              type:mongoose.Types.ObjectId,
              ref: "Booking"
            }
          ]
        


    },
     { timestamps: true }
)


//Hashing password using bcrypt

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10)
    next()
  })
    // Password & bcrypt Password id correct or not
  
    userSchema.methods.isPasswordCorrect = async function(password){
      return await bcrypt.compare(password , this.password)
    }


     // Create JWT Token method

     userSchema.methods.generateAccessToken = function () {
        return jwt.sign(
          {
            _id: this._id,
            email: this.email,
            username: this.username,
           
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
        );
      },

        // Create JWT Refresh Token

  userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    )
  }

  export const User = mongoose.model("User", userSchema);