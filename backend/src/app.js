import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json());

// Use cors middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's origin
}))

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/users.routes.js"
import testiRouter from "./routes/testimonials.routes.js"
import addProperty from "./routes/addProperty.route.js"
import addBooking from "./routes/Booking.router.js"
import  Admin  from "./routes/admin.routes.js";
//routes decleration

app.use("/api/v1/users" , userRouter )
app.use("/api/v1/property" , addProperty)
app.use("/api/v1/booking" , addBooking)
app.use("/api/v1/testimonials" ,testiRouter)
app.use("/api/v1/Admin" , Admin)


// http://localhost:8000/api/v1/users/register

export { app }