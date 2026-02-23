import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import doctorReducer from "../features/doctors/doctorSlice";
import adminReducer from '../features/admin/AdminSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    admin: adminReducer,
  },
});

export default store;
