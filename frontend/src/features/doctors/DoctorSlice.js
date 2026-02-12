import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

// Get user from localStorage
const doctor = JSON.parse(localStorage.getItem("user"));
