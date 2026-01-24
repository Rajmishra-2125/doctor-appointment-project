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
import userRouter from "./routes/user.routes.js";
import doctorRouter from "./routes/doctor.routes.js"
import slotsRouter from "./routes/slots.routes.js"
import appointmentRouter from "./routes/appointment.routes.js";


// routes
app.use('/api/v1/healthcheck', healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users/doctors", doctorRouter);
app.use("/api/v1/users/doctors", slotsRouter);
app.use("/api/v1/users/doctors/appointment", appointmentRouter);


export { app };