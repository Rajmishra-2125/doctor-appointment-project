import React from 'react'

function Register() {
  return (
    <>
    <main class="container mx-auto px-4 py-12">
        <div class="max-w-6xl mx-auto">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="md:flex">
                    {/* <!-- Left Side - Info --> */}
                    <div class="md:w-1/3 bg-linear-to-br from-blue-600 to-green-400 p-8 text-white">
                        <div class="mb-8">
                            <i class="fas fa-user-md text-5xl mb-4"></i>
                            <h2 class="text-2xl font-bold mb-4">Join MediCare</h2>
                            <p class="text-blue-100 mb-6">
                                Create your account to access quality healthcare services at your fingertips.
                            </p>
                        </div>

                        <div class="space-y-4">
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-400 mr-3"></i>
                                <span>Book appointments instantly</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-400 mr-3"></i>
                                <span>Consult with expert doctors</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-400 mr-3"></i>
                                <span>Access medical records</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-400 mr-3"></i>
                                <span>24/7 support available</span>
                            </div>
                        </div>

                        {/* <!-- Testimonial --> */}
                        <div class="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur">
                            <div class="flex items-center mb-2">
                                <img src="https://picsum.photos/seed/user1/40/40.jpg" alt="User" class="w-10 h-10 rounded-full mr-3"></img>
                                <div>
                                    <p class="font-medium">Sarah Johnson</p>
                                    <div class="flex text-yellow-400 text-sm">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <p class="text-sm text-blue-100">"MediCare made healthcare so accessible. Booking appointments is now just a few clicks away!"</p>
                        </div>
                    </div>

                    {/* <!-- Right Side - Registration Form --> */}
                    <div class="md:w-2/3 p-8">
                        <div class="mb-6">
                            <h2 class="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                            <p class="text-gray-600">Join thousands of patients who trust MediCare for their healthcare needs</p>
                        </div>

                        {/* <!-- Registration Type Tabs --> */}
                        <div class="mb-8">
                            <div class="flex border-b">
                                <button 
                                    class="px-4 py-3 font-medium text-blue-600 border-b-2 border-blue-600 focus:outline-none"
                                    onclick="switchTab('patient')"
                                    id="patientTab"
                                >
                                    <i class="fas fa-user mr-2"></i>Patient Registration
                                </button>
                                <button 
                                    class="px-4 py-3 font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
                                    onclick="switchTab('doctor')"
                                    id="doctorTab"
                                >
                                    <i class="fas fa-user-md mr-2"></i>Doctor Registration
                                </button>
                            </div>
                        </div>

                        {/* <!-- Patient Registration Form --> */}
                        <form id="patientForm" class="space-y-6" onsubmit="handleSubmit(event)">
                            {/* <!-- User Type Selection --> */}
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    I am a
                                </label>
                                <div class="grid grid-cols-2 gap-4">
                                    <label class="relative">
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="patient"
                                            checked
                                            className="peer sr-only"
                                        />
                                        <div class="border-2 border-gray-200 rounded-lg p-4 text-center cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:border-blue-300 transition-colors">
                                            <i class="fas fa-user text-xl mb-2"></i>
                                            <span class="font-medium">Patient</span>
                                        </div>
                                    </label>
                                    <label class="relative">
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="doctor"
                                            className="peer sr-only"
                                        />
                                        <div class="border-2 border-gray-200 rounded-lg p-4 text-center cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:border-blue-300 transition-colors">
                                            <i class="fas fa-user-md text-xl mb-2"></i>
                                            <span class="font-medium">Doctor</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* <!-- Name Fields --> */}
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <div class="relative">
                                        <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="John"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <div class="relative">
                                        <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Email and Phone --> */}
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div class="relative">
                                        <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <div class="relative">
                                        <i class="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Password Fields --> */}
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div class="relative">
                                        <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="••••••••"
                                            id="password"
                                        />
                                        <button
                                            type="button"
                                            onclick="togglePassword('password')"
                                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <i class="fas fa-eye" id="passwordToggle"></i>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div class="relative">
                                        <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            required
                                            class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="••••••••"
                                            id="confirmPassword"
                                        />
                                        <button
                                            type="button"
                                            onclick="togglePassword('confirmPassword')"
                                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <i class="fas fa-eye" id="confirmPasswordToggle"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Date of Birth and Gender --> */}
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth
                                    </label>
                                    <div class="relative">
                                        <i class="fas fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            required
                                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        required
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* <!-- Address --> */}
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <div class="relative">
                                    <i class="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="123 Medical St, City"
                                    />
                                </div>
                            </div>

                            {/* <!-- Terms and Conditions --> */}
                            <div>
                                <label class="flex items-start">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        required
                                        class="mt-1 mr-3"
                                    />
                                    <span class="text-sm text-gray-600">
                                        I agree to the{' '}
                                        <a href="#" class="text-blue-600 hover:text-blue-700">Terms and Conditions</a>{' '}
                                        and{' '}
                                        <a href="#" class="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                                    </span>
                                </label>
                            </div>

                            {/* <!-- Submit Button --> */}
                            <button
                                type="submit"
                                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                                <i class="fas fa-user-plus mr-2"></i>
                                Create Account
                            </button>

                            {/* <!-- Login Link --> */}
                            <div class="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="login.html" class="text-blue-600 hover:text-blue-700 font-medium">
                                    Sign In
                                </a>
                            </div>
                        </form>

                        {/* <!-- Doctor Registration Form (Hidden by default) --> */}
                        <form id="doctorForm" class="space-y-6 hidden" onsubmit="handleSubmit(event)">
                            {/* <!-- Doctor-specific fields --> */}
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Medical License Number
                                    </label>
                                    <input
                                        type="text"
                                        name="licenseNumber"
                                        required
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="MD123456"
                                    />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Specialization
                                    </label>
                                    <select
                                        name="specialization"
                                        required
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Specialization</option>
                                        <option value="cardiology">Cardiology</option>
                                        <option value="neurology">Neurology</option>
                                        <option value="pediatrics">Pediatrics</option>
                                        <option value="orthopedics">Orthopedics</option>
                                        <option value="general">General Practice</option>
                                    </select>
                                </div>
                            </div>

                            {/* <!-- Years of Experience --> */}
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Years of Experience
                                </label>
                                <input
                                    type="number"
                                    name="experience"
                                    required
                                    min="0"
                                    max="50"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="5"
                                />
                            </div>

                            {/* <!-- Hospital/Clinic --> */}
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Hospital/Clinic Name
                                </label>
                                <input
                                    type="text"
                                    name="hospital"
                                    required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="City Medical Center"
                                />
                            </div>

                            {/* <!-- Submit Button --> */}
                            <button
                                type="submit"
                                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                                <i class="fas fa-user-md mr-2"></i>
                                Register as Doctor
                            </button>

                            {/* <!-- Login Link --> */}
                            <div class="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="login.html" class="text-blue-600 hover:text-blue-700 font-medium">
                                    Sign In
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <!-- Benefits Section --> */}
            <div class="mt-12 grid md:grid-cols-3 gap-8">
                <div class="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-shield-alt text-blue-600 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Secure & Private</h3>
                    <p class="text-gray-600">Your medical information is protected with advanced encryption and privacy controls.</p>
                </div>

                <div class="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-clock text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Quick Registration</h3>
                    <p class="text-gray-600">Create your account in minutes and start accessing healthcare services immediately.</p>
                </div>

                <div class="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div class="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-headset text-purple-600 text-2xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
                    <p class="text-gray-600">Our support team is available round the clock to help you with any questions.</p>
                </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default Register