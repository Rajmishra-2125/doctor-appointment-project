import dotenv from "dotenv";
import {app} from './app.js';
import connectDB  from './db/index.js';
import setupCronJobs from "./jobs/cron.js";


dotenv.config({
  path: './.env',
})
const PORT = process.env.PORT || 8001;

connectDB()
.then(() => {
    app.listen(PORT, () => {
      console.log(`✅Server is running on port ${PORT}`);
      setupCronJobs();
    })
})
.catch((err) => {
    console.log('❌MongoDB connection error', err)
})