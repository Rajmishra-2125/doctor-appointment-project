import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import doctorReducer from "../features/doctors/doctorSlice";
import adminReducer from "../features/admin/adminSlice";
import agentReducer from "../features/agent/agentSlice";
import doctorAppointmentReducer from "../features/appointments/doctorAppointmentSlice";
import notificationReducer from "../features/notifications/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    admin: adminReducer,
    agent: agentReducer,
    doctorAppointments: doctorAppointmentReducer,
    notifications: notificationReducer,
  },
});

store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState().notifications);
    localStorage.setItem("notificationsState", serializedState);
  } catch (err) {
    // Ignore write errors
  }
});

export default store;
