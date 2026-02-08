import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../../features/auth/authSlice";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "../shared/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "MALE", // Default
    DOB: "",
    role: "PATIENT", // Default
  });

  const {
    fullname,
    username,
    email,
    password,
    confirmPassword,
    phone,
    gender,
    DOB,
    role,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success("Registration Successful!");
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Backend expects FormData for file upload compatibility, even if we don't send a file immediately
    // Or we can send JSON. Given multer is compliant, let's try strict FormData to be safe.
    const registrationData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "confirmPassword") {
        registrationData.append(key, formData[key]);
      }
    });

    dispatch(register(registrationData));
  };

  return (
    <main className="bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 min-h-screen transition-colors duration-200">
      {/* Top Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 items-center justify-center shadow-sm border space-y-4 flex border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="flex w-40 justify-center items-center ">
          <div className="w-1/2 py-2 text-center text-lg font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 -mb-0.5">
            Sign Up
          </div>
          <Link
            to="/login"
            className="w-1/2 py-2 text-center text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all -mb-0.5"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 ">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200">
          <div className="md:flex">
            {/* Left Side - Branding & Features (Hidden on mobile, visible on md+) */}
            <div className="md:w-1/3 bg-linear-to-br from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 p-8 text-white">
              <div className="relative z-10">
                <div className="mt-12">
                  <h1 className="text-4xl font-bold mb-4 leading-tight">
                    Join MediCare
                  </h1>
                  <p className="text-blue-100 text-lg mb-10">
                    Create your account to access quality healthcare services at
                    your fingertips.
                  </p>

                  <div className="space-y-4">
                    {[
                      "Book appointments instantly",
                      "Consult with expert doctors",
                      "Access medical records",
                      "AI booking assistant",
                      "Get your prescriptions",
                      "24/7 support available",
                      "Get instant notifications",
                      "Secure and confidential",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial Card */}
                  <div className="relative z-10 mt-10 bg-blue-700/50 dark:bg-blue-900/50 p-6 rounded-xl backdrop-blur-sm border border-blue-500/50">
                    <div className="flex items-center space-x-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg
                          key={s}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="italic text-sm mb-4">
                      "MediCare made healthcare so accessible. Booking
                      appointments is now just a few clicks away!"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                        <img
                          src="https://i.pravatar.cc/150?img=32"
                          alt="Sarah Johnson"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Sarah Johnson</p>
                        <p className="text-xs text-blue-200">
                          Patient since 2024
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:w-2/3 p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Create Your Account
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Join thousands of patients who trust MediCare for their
                  healthcare needs.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    I am a
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleRoleSelect("PATIENT")}
                      className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        role === "PATIENT"
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800"
                      }`}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleSelect("DOCTOR")}
                      className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        role === "DOCTOR"
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800"
                      }`}
                    >
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Doctor
                    </button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 transition-colors duration-200">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="fullname"
                          value={fullname}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="username"
                          value={username}
                          onChange={handleChange}
                          placeholder="johndoe123"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={phone}
                          onChange={handleChange}
                          placeholder="+1 234 567 8900"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="date"
                          name="DOB"
                          value={DOB}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          name="gender"
                          value={gender}
                          onChange={handleChange}
                          className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex justify-center items-center"
                  >
                    {isLoading ? (
                      <Spinner className="w-6 h-6 border-white" />
                    ) : (
                      <>
                        Create Account <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
