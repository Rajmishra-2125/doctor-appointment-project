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
import Layout from "./layout.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contacts/Contact.jsx";
import Home from "./components/Home/Home.jsx";
import User from "./components/Users/User.jsx";
import Doctors from "./components/Doctors/Doctors.jsx";
import Appointments from "./components/Appointments/Appointments.jsx";
import Services from "./components/Services/Services.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="doctors" element={<Doctors />} />
      <Route path="doctors/appointments" element={<Appointments />} />
      <Route path="services" element={<Services />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="user" element={<User />}>
        <Route path=":userid" element={<User />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
