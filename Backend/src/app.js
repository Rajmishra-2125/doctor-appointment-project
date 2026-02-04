import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express()

// CORS
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
)

// Common middlewares
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ 
    extended: true,
    limit: "16kb",
}))

app.use(express.static("public"))
app.use(cookieParser())

// import Routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import doctorRouter from "./routes/doctor.routes.js"
import appointmentRouter from "./routes/appointment.routes.js";


// routes
app.use('/api/v1/healthcheck', healthcheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/appointment", appointmentRouter);


export { app };