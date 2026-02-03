import React from 'react'

function Services() {
  return (
    <>
      <section class="bg-linear-to-br from-blue-600 to-green-400 text-white py-20">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">Comprehensive Healthcare Services</h2>
                <p class="text-xl mb-8 text-blue-100">Access quality medical care with our wide range of healthcare services designed to meet all your needs</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button class="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                        <i class="fas fa-calendar-plus mr-2"></i>Book Appointment
                    </button>
                    <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                        <i class="fas fa-phone mr-2"></i>Call Us Now
                    </button>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Services Categories --> */}
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Service Categories</h2>
                <p class="text-xl text-gray-600">Choose from our comprehensive range of medical services</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* <!-- Online Consultation --> */}
                <div class="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
                    <div class="bg-blue-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                        <i class="fas fa-video text-blue-600 text-2xl group-hover:text-white transition-colors duration-300"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Online Consultation</h3>
                    <p class="text-gray-600 mb-6">Connect with experienced doctors remotely through secure video calls from the comfort of your home.</p>
                    <ul class="text-gray-600 space-y-2 mb-6">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Secure video platform
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Instant doctor availability
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Digital prescriptions
                        </li>
                    </ul>
                    <button class="text-blue-600 font-medium hover:text-blue-700 group-hover:text-blue-700 transition-colors">
                        Learn More <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                </div>

                {/* <!-- Emergency Care --> */}
                <div class="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-red-300">
                    <div class="bg-red-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                        <i class="fas fa-ambulance text-red-600 text-2xl group-hover:text-white transition-colors duration-300"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Emergency Care</h3>
                    <p class="text-gray-600 mb-6">24/7 emergency medical services with rapid response and critical care facilities.</p>
                    <ul class="text-gray-600 space-y-2 mb-6">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            24/7 availability
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Critical care specialists
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Ambulance services
                        </li>
                    </ul>
                    <button class="text-blue-600 font-medium hover:text-blue-700 group-hover:text-blue-700 transition-colors">
                        Learn More <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                </div>

                {/* <!-- Health Checkup --> */}
                <div class="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-green-300">
                    <div class="bg-green-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                        <i class="fas fa-heartbeat text-green-600 text-2xl group-hover:text-white transition-colors duration-300"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Health Checkup</h3>
                    <p class="text-gray-600 mb-6">Comprehensive health screening packages for early detection and prevention of diseases.</p>
                    <ul class="text-gray-600 space-y-2 mb-6">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Full body checkup
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Specialized packages
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Expert consultation
                        </li>
                    </ul>
                    <button class="text-blue-600 font-medium hover:text-blue-700 group-hover:text-blue-700 transition-colors">
                        Learn More <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                </div>

                {/* <!-- Medical Records --> */}
                <div class="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-purple-300">
                    <div class="bg-purple-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                        <i class="fas fa-file-medical text-purple-600 text-2xl group-hover:text-white transition-colors duration-300"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Medical Records</h3>
                    <p class="text-gray-600 mb-6">Secure digital storage and easy access to your complete medical history and reports.</p>
                    <ul class="text-gray-600 space-y-2 mb-6">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Cloud storage
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Easy sharing
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            HIPAA compliant
                        </li>
                    </ul>
                    <button class="text-blue-600 font-medium hover:text-blue-700 group-hover:text-blue-700 transition-colors">
                        Learn More <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                </div>

                {/* <!-- Pharmacy --> */}
                <div class="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-orange-300">
                    <div class="bg-orange-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                        <i class="fas fa-pills text-orange-600 text-2xl group-hover:text-white transition-colors duration-300"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Pharmacy Services</h3>
                    <p class="text-gray-600 mb-6">Online pharmacy with home delivery of medicines and health products.</p>
                    <ul class="text-gray-600 space-y-2 mb-6">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Home delivery
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Prescription upload
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Discount offers
                        </li>
                    </ul>
                    <button class="text-blue-600 font-medium hover:text-blue-700 group-hover:text-blue-700 transition-colors">
                        Learn More <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                </div>

                {/* <!-- Lab Tests --> */}
                <div class="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-indigo-300">
                    <div class="bg-indigo-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                        <i class="fas fa-vial text-indigo-600 text-2xl group-hover:text-white transition-colors duration-300"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Lab Tests</h3>
                    <p class="text-gray-600 mb-6">Comprehensive diagnostic and pathology services with accurate results.</p>
                    <ul class="text-gray-600 space-y-2 mb-6">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Home sample collection
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            Online reports
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            NABL accredited
                        </li>
                    </ul>
                    <button class="text-blue-600 font-medium hover:text-blue-700 group-hover:text-blue-700 transition-colors">
                        Learn More <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Specialized Services --> */}
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Specialized Medical Services</h2>
                <p class="text-xl text-gray-600">Expert care across various medical specialties</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* <!-- Cardiology --> */}
                <div class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-red-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-heartbeat text-red-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Cardiology</h3>
                    <p class="text-gray-600 text-sm mb-4">Heart and cardiovascular care</p>
                    <button class="text-blue-600 font-medium text-sm hover:text-blue-700">View Details</button>
                </div>

                {/* <!-- Neurology --> */}
                <div class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-green-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-brain text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Neurology</h3>
                    <p class="text-gray-600 text-sm mb-4">Brain and nervous system</p>
                    <button class="text-blue-600 font-medium text-sm hover:text-blue-700">View Details</button>
                </div>

                {/* <!-- Orthopedics --> */}
                <div class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-orange-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-bone text-orange-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Orthopedics</h3>
                    <p class="text-gray-600 text-sm mb-4">Bone and joint care</p>
                    <button class="text-blue-600 font-medium text-sm hover:text-blue-700">View Details</button>
                </div>

                {/* <!-- Pediatrics --> */}
                <div class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-purple-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-baby text-purple-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Pediatrics</h3>
                    <p class="text-gray-600 text-sm mb-4">Child healthcare</p>
                    <button class="text-blue-600 font-medium text-sm hover:text-blue-700">View Details</button>
                </div>

                {/* <!-- Gynecology --> */}
                <div class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-pink-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-female text-pink-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Gynecology</h3>
                    <p class="text-gray-600 text-sm mb-4">Women's health</p>
                    <button class="text-blue-600 font-medium text-sm hover:text-blue-700">View Details</button>
                </div>

                {/* <!-- Dermatology --> */}
                <div class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-blue-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-hand-holding-heart text-blue-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Dermatology</h3>
                    <p class="text-gray-600 text-sm mb-4">Skin and hair care</p>
                    <button class="text-blue-600 font-medium text-sm hover:text-blue-700">View Details</button>
                </div>

                {/* <!-- Ophthalmology --> */}
                <div class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-indigo-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-eye text-indigo-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Ophthalmology</h3>
                    <p class="text-gray-600 text-sm mb-4">Eye care and vision</p>
                    <button class="text-blue-600 font-medium text-sm hover:text-blue-700">View Details</button>
                </div>

                {/* <!-- ENT --> */}
                <div class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-teal-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-head-side-mask text-teal-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">ENT</h3>
                    <p class="text-gray-600 text-sm mb-4">Ear, nose, throat care</p>
                    <button class="text-blue-600 font-medium text-sm hover:text-blue-700">View Details</button>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Service Process --> */}
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Our Services Work</h2>
                <p class="text-xl text-gray-600">Simple steps to access quality healthcare</p>
            </div>

            <div class="grid md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-search text-blue-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-3">1. Find Service</h3>
                    <p class="text-gray-600">Browse our comprehensive range of healthcare services and choose what you need</p>
                </div>
                <div class="text-center">
                    <div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-calendar-check text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-3">2. Book Appointment</h3>
                    <p class="text-gray-600">Schedule your appointment at your preferred time and date</p>
                </div>
                <div class="text-center">
                    <div class="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-user-md text-purple-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-3">3. Consultation</h3>
                    <p class="text-gray-600">Connect with our expert doctors for your consultation</p>
                </div>
                <div class="text-center">
                    <div class="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-file-medical text-orange-600 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-3">4. Get Care</h3>
                    <p class="text-gray-600">Receive your treatment plan and follow-up care</p>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Pricing Plans --> */}
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Packages</h2>
                <p class="text-xl text-gray-600">Choose the perfect plan for your healthcare needs</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* <!-- Basic Plan --> */}
                <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                        <div class="text-4xl font-bold text-gray-900 mb-2">$29<span class="text-lg text-gray-600">/month</span></div>
                        <p class="text-gray-600">Perfect for individuals</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span>2 online consultations</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span>Basic health checkup</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span>Digital records</span>
                        </li>
                        <li class="flex items-center text-gray-400">
                            <i class="fas fa-times text-gray-400 mr-3"></i>
                            <span>Lab tests</span>
                        </li>
                        <li class="flex items-center text-gray-400">
                            <i class="fas fa-times text-gray-400 mr-3"></i>
                            <span>Emergency care</span>
                        </li>
                    </ul>
                    <button class="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                        Choose Basic
                    </button>
                </div>

                {/* <!-- Premium Plan --> */}
                <div class="bg-blue-600 rounded-xl shadow-xl p-8 text-white transform scale-105">
                    <div class="bg-yellow-400 text-blue-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">POPULAR</div>
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold mb-2">Premium</h3>
                        <div class="text-4xl font-bold mb-2">$79<span class="text-lg text-blue-100">/month</span></div>
                        <p class="text-blue-100">Most comprehensive care</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center">
                            <i class="fas fa-check text-white mr-3"></i>
                            <span>Unlimited consultations</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-white mr-3"></i>
                            <span>Complete health checkup</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-white mr-3"></i>
                            <span>Advanced digital records</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-white mr-3"></i>
                            <span>Basic lab tests</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-white mr-3"></i>
                            <span>24/7 emergency support</span>
                        </li>
                    </ul>
                    <button class="w-full bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                        Choose Premium
                    </button>
                </div>

                {/* <!-- Family Plan --> */}
                <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Family</h3>
                        <div class="text-4xl font-bold text-gray-900 mb-2">$149<span class="text-lg text-gray-600">/month</span></div>
                        <p class="text-gray-600">For the whole family</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span>Family consultations</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span>Family health checkups</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span>Family digital records</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span>All lab tests included</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-3"></i>
                            <span>Priority emergency care</span>
                        </li>
                    </ul>
                    <button class="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                        Choose Family
                    </button>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- CTA Section --> */}
    <section class="py-16 bg-linear-to-r from-blue-600 to-green-400 text-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Get Started Today</h2>
            <p class="text-xl mb-8 text-blue-100">Join thousands of satisfied patients who trust MediCare for their healthcare needs</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
                    <i class="fas fa-user-plus mr-2"></i>Sign Up Now
                </button>
                <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
                    <i class="fas fa-phone mr-2"></i>Contact Support
                </button>
            </div>
        </div>
    </section>
    </>
  )
}

export default Services
