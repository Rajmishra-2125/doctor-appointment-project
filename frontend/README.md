# 🎨 Doctor Appointment System – Frontend Development Guide

This document provides a complete guide for building the React frontend of the Doctor Appointment Booking System.

---

## 📋 Table of Contents

1. [Tech Stack & Setup](#tech-stack--setup)
2. [Project Structure](#project-structure)
3. [Core Configuration](#core-configuration)
4. [State Management](#state-management)
5. [Routing & Navigation](#routing--navigation)
6. [API Integration](#api-integration)
7. [Authentication Flow](#authentication-flow)
8. [Component Library](#component-library)
9. [Pages & Features](#pages--features)
10. [Real-time Features](#real-time-features)
11. [Forms & Validation](#forms--validation)
12. [Styling & Theming](#styling--theming)
13. [Performance Optimization](#performance-optimization)
14. [Testing](#testing)
15. [Deployment](#deployment)

---

## 🛠️ Tech Stack & Setup

### Core Technologies

```json
{
  "React": "^18.3.1",
  "Vite": "^5.0.0",
  "React Router": "^6.20.0",
  "Redux Toolkit": "^2.0.0",
  "React Query": "^5.0.0",
  "Axios": "^1.6.0",
  "Tailwind CSS": "^3.4.0",
  "Shadcn/ui": "latest"
}
```

### Initial Setup

```bash
# Create Vite React project
npm create vite@latest frontend -- --template react
cd frontend

# Install core dependencies
npm install react-router-dom @reduxjs/toolkit react-redux
npm install axios @tanstack/react-query
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react date-fns
npm install socket.io-client
npm install recharts  # For charts
npm install react-hot-toast  # For notifications

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install Shadcn/ui
npx shadcn-ui@latest init

# Dev dependencies
npm install -D @types/node
npm install -D eslint prettier
```

### Environment Variables

```env
# .env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── components/
│   │   ├── ui/                    # Shadcn components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── input.jsx
│   │   │   ├── select.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── avatar.jsx
│   │   │   ├── calendar.jsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Layout.jsx
│   │   ├── shared/                # Reusable components
│   │   │   ├── Loading.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── RoleRoute.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ForgotPasswordForm.jsx
│   │   ├── doctors/
│   │   │   ├── DoctorCard.jsx
│   │   │   ├── DoctorGrid.jsx
│   │   │   ├── DoctorDetail.jsx
│   │   │   ├── DoctorFilters.jsx
│   │   │   ├── FollowButton.jsx
│   │   │   └── DoctorProfileForm.jsx
│   │   ├── appointments/
│   │   │   ├── AppointmentCard.jsx
│   │   │   ├── AppointmentList.jsx
│   │   │   ├── DatePicker.jsx
│   │   │   ├── TimeSlotPicker.jsx
│   │   │   ├── BookingFlow.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── CancelModal.jsx
│   │   ├── reviews/
│   │   │   ├── ReviewCard.jsx
│   │   │   ├── ReviewList.jsx
│   │   │   ├── ReviewForm.jsx
│   │   │   └── RatingStars.jsx
│   │   ├── notifications/
│   │   │   ├── NotificationBell.jsx
│   │   │   ├── NotificationDropdown.jsx
│   │   │   ├── NotificationItem.jsx
│   │   │   └── NotificationList.jsx
│   │   ├── profile/
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── EditProfileForm.jsx
│   │   │   ├── AvatarUpload.jsx
│   │   │   └── ChangePassword.jsx
│   │   ├── payment/
│   │   │   ├── StripeCheckout.jsx
│   │   │   ├── PaymentForm.jsx
│   │   │   └── PaymentSummary.jsx
│   │   └── admin/
│   │       ├── StatsCard.jsx
│   │       ├── UsersTable.jsx
│   │       ├── DoctorsTable.jsx
│   │       └── Charts.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── patient/
│   │   │   ├── DoctorsList.jsx
│   │   │   ├── DoctorDetail.jsx
│   │   │   ├── MyAppointments.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── BookAppointment.jsx
│   │   ├── doctor/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DoctorProfile.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── Availability.jsx
│   │   │   └── Reviews.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── UsersManagement.jsx
│   │   │   ├── DoctorsManagement.jsx
│   │   │   └── Analytics.jsx
│   │   ├── payment/
│   │   │   ├── PaymentPage.jsx
│   │   │   ├── PaymentSuccess.jsx
│   │   │   └── PaymentFailed.jsx
│   │   ├── NotFound.jsx
│   │   └── Unauthorized.jsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.js
│   │   │   └── authAPI.js
│   │   ├── doctors/
│   │   │   ├── doctorsSlice.js
│   │   │   └── doctorsAPI.js
│   │   ├── appointments/
│   │   │   ├── appointmentsSlice.js
│   │   │   └── appointmentsAPI.js
│   │   ├── notifications/
│   │   │   ├── notificationsSlice.js
│   │   │   └── notificationsAPI.js
│   │   └── reviews/
│   │       ├── reviewsSlice.js
│   │       └── reviewsAPI.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   ├── useSocket.js
│   │   ├── useNotifications.js
│   │   ├── useLocalStorage.js
│   │   └── useMediaQuery.js
│   ├── services/
│   │   ├── api.js              # Axios instance
│   │   ├── socket.js           # Socket.io client
│   │   ├── storage.js          # LocalStorage utils
│   │   └── cloudinary.js       # Image upload
│   ├── store/
│   │   └── store.js            # Redux store
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   ├── main.jsx
│   └── lib/
│       └── utils.js            # Shadcn utilities
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## ⚙️ Core Configuration

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

### Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### Global Styles

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-400 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500;
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}
```

---

## 🗃️ State Management

### Redux Store Setup

```javascript
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import doctorsReducer from '@/features/doctors/doctorsSlice';
import appointmentsReducer from '@/features/appointments/appointmentsSlice';
import notificationsReducer from '@/features/notifications/notificationsSlice';
import reviewsReducer from '@/features/reviews/reviewsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
    notifications: notificationsReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
```

### Auth Slice Example

```javascript
// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from './authAPI';

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCurrentUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authAPI.logout();
  localStorage.removeItem('token');
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      // Load User
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
```

### Auth API Service

```javascript
// src/features/auth/authAPI.js
import api from '@/services/api';

export const register = (userData) => {
  return api.post('/auth/register', userData);
};

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const getCurrentUser = () => {
  return api.get('/auth/me');
};

export const refreshToken = () => {
  return api.post('/auth/refresh');
};
```

---

## 🛣️ Routing & Navigation

### App Router

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '@/features/auth/authSlice';
import { Toaster } from 'react-hot-toast';

// Layouts
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import RoleRoute from '@/components/shared/RoleRoute';

// Pages
import Home from '@/pages/Home';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import DoctorsList from '@/pages/patient/DoctorsList';
import DoctorDetail from '@/pages/patient/DoctorDetail';
import MyAppointments from '@/pages/patient/MyAppointments';
import BookAppointment from '@/pages/patient/BookAppointment';
import Profile from '@/pages/patient/Profile';

// Doctor Pages
import DoctorDashboard from '@/pages/doctor/Dashboard';
import DoctorProfile from '@/pages/doctor/DoctorProfile';
import DoctorAppointments from '@/pages/doctor/Appointments';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UsersManagement from '@/pages/admin/UsersManagement';
import DoctorsManagement from '@/pages/admin/DoctorsManagement';

// Other
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="doctors" element={<DoctorsList />} />
          <Route path="doctors/:id" element={<DoctorDetail />} />

          {/* Protected Patient Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="appointments" element={<MyAppointments />} />
            <Route path="book-appointment/:doctorId" element={<BookAppointment />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Doctor Only Routes */}
          <Route element={<RoleRoute allowedRoles={['doctor']} />}>
            <Route path="doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="doctor/profile" element={<DoctorProfile />} />
            <Route path="doctor/appointments" element={<DoctorAppointments />} />
          </Route>

          {/* Admin Only Routes */}
          <Route element={<RoleRoute allowedRoles={['admin']} />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/users" element={<UsersManagement />} />
            <Route path="admin/doctors" element={<DoctorsManagement />} />
          </Route>

          {/* Error Routes */}
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Protected Route Component

```jsx
// src/components/shared/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
```

### Role-Based Route Component

```jsx
// src/components/shared/RoleRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
```

---

## 🌐 API Integration

### Axios Instance

```javascript
// src/services/api.js
import axios from 'axios';
import { store } from '@/store/store';
import { logout } from '@/features/auth/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Update token in store
        localStorage.setItem('token', data.token);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

### React Query Setup

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from './store/store';
import App from './App';
import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
```

### Example: Using React Query

```jsx
// src/pages/patient/DoctorsList.jsx
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import DoctorCard from '@/components/doctors/DoctorCard';
import Loading from '@/components/shared/Loading';

const fetchDoctors = async (filters) => {
  const { data } = await api.get('/doctors', { params: filters });
  return data.data;
};

const DoctorsList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    specialization: '',
    search: '',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['doctors', filters],
    queryFn: () => fetchDoctors(filters),
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading doctors</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Find Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.doctors?.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
```

---

## 🔐 Authentication Flow

### Login Page

```jsx
// src/pages/auth/Login.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearError } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <p className="text-center text-gray-600">Welcome back!</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
```

### Register Page

```jsx
// src/pages/auth/Register.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, clearError } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import toast from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;
    dispatch(register(dataToSend));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Register</h2>
          <p className="text-center text-gray-600">Create your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                Register as
              </label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600 text-center w-full">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
```

---

## 🧩 Component Library

### Doctor Card Component

```jsx
// src/components/doctors/DoctorCard.jsx
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Users } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  const { _id, userId, specialization, consultationFee, rating, followers } = doctor;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userId?.avatar} alt={userId?.name} />
            <AvatarFallback>{userId?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{userId?.name}</h3>
            <Badge variant="secondary" className="mt-1">
              {specialization}
            </Badge>
            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{rating?.average?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{followers?.length || 0} followers</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Consultation Fee</p>
          <p className="text-lg font-bold">${consultationFee}</p>
        </div>
        <Link to={`/doctors/${_id}`}>
          <Button>View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
```

### Appointment Card Component

```jsx
// src/components/appointments/AppointmentCard.jsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, X } from 'lucide-react';
import { format } from 'date-fns';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
};

const AppointmentCard = ({ appointment, role, onCancel }) => {
  const { doctorId, patientId, date, timeSlot, status, symptoms } = appointment;
  const displayUser = role === 'patient' ? doctorId?.userId : patientId;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={displayUser?.avatar} alt={displayUser?.name} />
              <AvatarFallback>{displayUser?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{displayUser?.name}</h3>
              {role === 'patient' && (
                <p className="text-sm text-gray-600">{doctorId?.specialization}</p>
              )}
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{format(new Date(date), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{timeSlot?.start}</span>
                </div>
              </div>
              {symptoms && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Symptoms:</strong> {symptoms}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={statusColors[status]}>{status}</Badge>
            {status === 'pending' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCancel(appointment._id)}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
```

### Time Slot Picker

```jsx
// src/components/appointments/TimeSlotPicker.jsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const TimeSlotPicker = ({ slots, selectedSlot, onSelect }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Select Time Slot</h3>
      <div className="grid grid-cols-3 gap-3">
        {slots?.map((slot, index) => (
          <Button
            key={index}
            variant={selectedSlot === slot.start ? 'default' : 'outline'}
            disabled={slot.isBooked}
            onClick={() => onSelect(slot.start)}
            className="flex items-center justify-center"
          >
            <Clock className="h-4 w-4 mr-2" />
            {slot.start}
          </Button>
        ))}
      </div>
      {slots?.length === 0 && (
        <p className="text-gray-500 text-center py-8">No slots available for this date</p>
      )}
    </div>
  );
};

export default TimeSlotPicker;
```

---

## 📱 Pages & Features

### Home Page

```jsx
// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, MessageSquare, Shield } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: 'Find Doctors',
      description: 'Search and filter doctors by specialization, location, and ratings',
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      title: 'Book Appointments',
      description: 'Schedule appointments with real-time availability checking',
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: 'Instant Notifications',
      description: 'Get real-time updates on appointment status',
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and protected',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find & Book Appointments with Top Doctors
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your health is our priority. Connect with qualified doctors and book
            appointments in minutes.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/doctors">
              <Button size="lg" variant="secondary">
                Find Doctors
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-white border-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have found quality healthcare through our
            platform
          </p>
          <Link to="/register">
            <Button size="lg">Create Account</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
```

### Doctor Detail Page

```jsx
// src/pages/patient/DoctorDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, DollarSign, Calendar, Users } from 'lucide-react';
import Loading from '@/components/shared/Loading';

const fetchDoctorDetail = async (id) => {
  const { data } = await api.get(`/doctors/${id}`);
  return data.data;
};

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data: doctor, isLoading } = useQuery({
    queryKey: ['doctor', id],
    queryFn: () => fetchDoctorDetail(id),
  });

  if (isLoading) return <Loading />;

  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/book-appointment/${id}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardContent className="p-8">
          {/* Doctor Header */}
          <div className="flex items-start space-x-6 mb-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src={doctor?.userId?.avatar} />
              <AvatarFallback className="text-3xl">
                {doctor?.userId?.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{doctor?.userId?.name}</h1>
              <Badge variant="secondary" className="mb-4">
                {doctor?.specialization}
              </Badge>
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>
                    {doctor?.rating?.average?.toFixed(1) || 'N/A'} ({doctor?.rating?.count || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{doctor?.followers?.length || 0} followers</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-1" />
                  <span>${doctor?.consultationFee}</span>
                </div>
              </div>
            </div>
            <Button size="lg" onClick={handleBookAppointment}>
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment
            </Button>
          </div>

          {/* About */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-600">{doctor?.about || 'No description available'}</p>
          </div>

          {/* Qualifications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Qualifications</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {doctor?.qualifications?.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Experience</h2>
            <p className="text-gray-600">{doctor?.experience} years</p>
          </div>

          {/* Clinic Address */}
          {doctor?.clinicAddress && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Clinic Address</h2>
              <div className="flex items-start text-gray-600">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <div>
                  <p>{doctor.clinicAddress.name}</p>
                  <p>{doctor.clinicAddress.street}</p>
                  <p>
                    {doctor.clinicAddress.city}, {doctor.clinicAddress.state}{' '}
                    {doctor.clinicAddress.zipCode}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDetail;
```

---

## 🔔 Real-time Features

### Socket.io Client Setup

```javascript
// src/services/socket.js
import { io } from 'socket.io-client';
import { store } from '@/store/store';
import { addNotification } from '@/features/notifications/notificationsSlice';

let socket = null;

export const initSocket = () => {
  const token = store.getState().auth.token;

  if (!token) return;

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('notification:new', (notification) => {
    store.dispatch(addNotification(notification));
    // Show toast notification
    toast.info(notification.message);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
```

### useSocket Hook

```javascript
// src/hooks/useSocket.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initSocket, disconnectSocket } from '@/services/socket';

export const useSocket = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      const socket = initSocket();
      return () => disconnectSocket();
    }
  }, [isAuthenticated]);
};
```

### Notification Bell Component

```jsx
// src/components/notifications/NotificationBell.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NotificationDropdown from './NotificationDropdown';

const NotificationBell = () => {
  const { unreadCount } = useSelector((state) => state.notifications);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <NotificationDropdown />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
```

---

## 📝 Forms & Validation

### Using React Hook Form with Zod

```jsx
// src/components/doctors/DoctorProfileForm.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const doctorSchema = z.object({
  specialization: z.string().min(1, 'Specialization is required'),
  qualifications: z.string().min(1, 'Qualifications are required'),
  experience: z.number().min(0, 'Experience must be positive'),
  consultationFee: z.number().min(0, 'Fee must be positive'),
  about: z.string().min(50, 'About must be at least 50 characters'),
});

const DoctorProfileForm = ({ onSubmit, defaultValues }) => {
  const form = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: defaultValues || {
      specialization: '',
      qualifications: '',
      experience: 0,
      consultationFee: 0,
      about: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Cardiologist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="qualifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualifications</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your qualifications (comma separated)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience (years)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consultationFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consultation Fee ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself..."
                  className="min-h-30"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Profile
        </Button>
      </form>
    </Form>
  );
};

export default DoctorProfileForm;
```

---

## 🎨 Styling & Theming

### Custom Utility Classes

```css
/* src/styles/globals.css */

/* Add these after Tailwind directives */

/* Custom animations */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Custom card hover */
.card-hover {
  @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
}

/* Status badges */
.status-pending {
  @apply bg-yellow-100 text-yellow-800 border-yellow-200;
}

.status-confirmed {
  @apply bg-green-100 text-green-800 border-green-200;
}

.status-cancelled {
  @apply bg-red-100 text-red-800 border-red-200;
}

.status-completed {
  @apply bg-blue-100 text-blue-800 border-blue-200;
}
```

---

## ⚡ Performance Optimization

### Code Splitting

```jsx
// src/App.jsx
import { lazy, Suspense } from 'react';
import Loading from '@/components/shared/Loading';

// Lazy load pages
const DoctorsList = lazy(() => import('@/pages/patient/DoctorsList'));
const DoctorDetail = lazy(() => import('@/pages/patient/DoctorDetail'));
const BookAppointment = lazy(() => import('@/pages/patient/BookAppointment'));

// Use with Suspense
<Suspense fallback={<Loading />}>
  <DoctorsList />
</Suspense>
```

### Image Optimization

```jsx
// src/components/shared/OptimizedImage.jsx
import { useState } from 'react';
import { cn } from '@/lib/utils';

const OptimizedImage = ({ src, alt, className, fallback }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
        loading="lazy"
      />
    </div>
  );
};

export default OptimizedImage;
```

### Custom Hooks

```javascript
// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
```

```javascript
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
```

---

## 🧪 Testing

### Component Testing Setup

```javascript
// Install dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```javascript
// src/test/setup.js
import '@testing-library/jest-dom';
```

### Example Component Test

```jsx
// src/components/doctors/__tests__/DoctorCard.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DoctorCard from '../DoctorCard';

const mockDoctor = {
  _id: '123',
  userId: {
    name: 'Dr. John Doe',
    avatar: 'avatar.jpg',
  },
  specialization: 'Cardiologist',
  consultationFee: 100,
  rating: {
    average: 4.5,
    count: 10,
  },
  followers: ['1', '2', '3'],
};

describe('DoctorCard', () => {
  it('renders doctor information correctly', () => {
    render(
      <BrowserRouter>
        <DoctorCard doctor={mockDoctor} />
      </BrowserRouter>
    );

    expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
    expect(screen.getByText('Cardiologist')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });
});
```

---

## 🚀 Deployment

### Build for Production

```bash
# Build the app
npm run build

# Preview the build locally
npm run preview
```

### Environment Variables for Production

```env
# .env.production
VITE_API_URL=https://your-api-domain.com/api
VITE_SOCKET_URL=https://your-api-domain.com
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📚 Best Practices

### File Naming Conventions

```
- Components: PascalCase (DoctorCard.jsx)
- Hooks: camelCase with 'use' prefix (useAuth.js)
- Utils: camelCase (formatters.js)
- Constants: UPPER_SNAKE_CASE (API_ENDPOINTS.js)
```

### Code Organization

```javascript
// Import order
1. React imports
2. Third-party libraries
3. Internal components
4. Hooks
5. Utils and constants
6. Styles

// Example:
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/formatters';
import './styles.css';
```

### Error Handling

```jsx
// Global error boundary
// src/components/shared/ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:underline"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## 🎯 Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Check Code Quality**
   ```bash
   npm run lint
   npm run format
   ```

3. **Run Tests**
   ```bash
   npm run test
   npm run test:ui  # Visual test interface
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

---

## 📝 Checklist for Production

- [ ] All environment variables set
- [ ] API endpoints configured
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Form validation working
- [ ] Responsive design tested
- [ ] Cross-browser compatibility checked
- [ ] Lighthouse score > 90
- [ ] Accessibility score > 90
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Error boundary added
- [ ] Analytics integrated
- [ ] SEO meta tags added
- [ ] Favicon added
- [ ] Build tested locally

---

**This frontend guide provides everything you need to build a professional, production-ready React application for the Doctor Appointment System.**