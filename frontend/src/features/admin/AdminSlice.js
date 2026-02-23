import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "../../services/adminServices";

const initialState = {
  stats: null,
  users: [],
  doctors: [],
  appointments: [],
  slots: [],
  isLoading: false,
  isChartLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Get dashboard stats
export const getDashboardStats = createAsyncThunk(
  "admin/getStats",
  async (period, thunkAPI) => {
    try {
      return await adminService.getDashboardStats(period);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get all users
export const getAllUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllUsers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get all doctors
export const getAllDoctors = createAsyncThunk(
  "admin/getDoctors",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllDoctors();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get all appointments
export const getAllAppointments = createAsyncThunk(
  "admin/getAppointments",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllAppointments();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get all slots
export const getAllSlots = createAsyncThunk(
  "admin/getSlots",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllSlots();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Create slot
export const createSlot = createAsyncThunk(
  "admin/createSlot",
  async (slotData, thunkAPI) => {
    try {
      return await adminService.createSlot(slotData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Book appointment
export const bookAppointment = createAsyncThunk(
  "admin/bookAppointment",
  async (appointmentData, thunkAPI) => {
    try {
      return await adminService.bookAppointment(appointmentData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Reschedule appointment
export const rescheduleAppointment = createAsyncThunk(
  "admin/rescheduleAppointment",
  async ({ appointmentId, rescheduleData }, thunkAPI) => {
    try {
      return await adminService.rescheduleAppointment(
        appointmentId,
        rescheduleData,
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Create doctor
export const createDoctor = createAsyncThunk(
  "admin/createDoctor",
  async (doctorData, thunkAPI) => {
    try {
      return await adminService.createDoctor(doctorData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Approve doctor
export const approveDoctor = createAsyncThunk(
  "admin/approveDoctor",
  async (doctorId, thunkAPI) => {
    try {
      return await adminService.approveDoctor(doctorId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Reject doctor
export const rejectDoctor = createAsyncThunk(
  "admin/rejectDoctor",
  async (doctorId, thunkAPI) => {
    try {
      return await adminService.rejectDoctor(doctorId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Delete doctor
export const deleteDoctor = createAsyncThunk(
  "admin/deleteDoctor",
  async (doctorId, thunkAPI) => {
    try {
      return await adminService.deleteDoctor(doctorId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        // Only set the main isLoading to true if we don't have stats yet (initial load)
        if (!state.stats) {
          state.isLoading = true;
        }
        state.isChartLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isChartLoading = false;
        state.isSuccess = true;
        state.stats = action.payload.data;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isChartLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.data;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.doctors = action.payload.data;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.appointments = action.payload.data;
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllSlots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.slots = action.payload.data;
      })
      .addCase(getAllSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSlot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSlot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.slots.push(action.payload.data);
      })
      .addCase(createSlot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(bookAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.appointments.push(action.payload.data);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(rescheduleAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rescheduleAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        const index = state.appointments.findIndex(
          (apt) => apt._id === action.payload.data._id,
        );
        if (index !== -1) state.appointments[index] = action.payload.data;
      })
      .addCase(rescheduleAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        // The backend returns { user, profile }
        state.doctors.push(action.payload.data.profile);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(approveDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        const index = state.doctors.findIndex(
          (doc) => doc._id === action.payload.data._id,
        );
        if (index !== -1) state.doctors[index] = action.payload.data;
      })
      .addCase(rejectDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        const index = state.doctors.findIndex(
          (doc) => doc._id === action.payload.data._id,
        );
        if (index !== -1) state.doctors[index] = action.payload.data;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.doctors = state.doctors.filter(
          (doc) => doc._id !== action.payload.data._id,
        );
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
