import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contacts/Contact.jsx";
import Home from "./components/Home/Home.jsx";
import User from "./components/Users/User.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Doctors from "./components/Doctors/Doctors.jsx";
import Appointments from "./components/Appointments/Appointments.jsx";
import Services from "./components/Services/Services.jsx";
import Profile from "./components/Users/Profile.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx"; // Import ProtectedRoute
import Settings from "./components/Settings/Settings.jsx";
import RecoverAccount from "./components/Auth/RecoverAccount.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="user/:userid" element={<User />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="recover-account" element={<RecoverAccount />} />
      <Route path="doctors" element={<Doctors />} />
      <Route path="appointments" element={<Appointments />} />
      <Route path="services" element={<Services />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        {/* Add other protected routes here */}
      </Route>
    </Route>,
  ),
);

import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
