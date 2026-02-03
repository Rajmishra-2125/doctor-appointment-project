import React from 'react'

function Doctors() {
  return (
    <div>
      <section class="bg-linear-to-br from-blue-600 to-green-400 text-white py-16">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">Find Your Perfect Doctor</h2>
                <p class="text-xl mb-8 text-blue-100">Connect with experienced healthcare professionals in your area</p>
                
                {/* Search Bar */}

                <div class="bg-white rounded-lg shadow-xl p-6 max-w-3xl mx-auto">
                    <div class="grid md:grid-cols-3 gap-4 mb-4">
                        <div class="relative">
                            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input type="text" placeholder="Search by name, specialty..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"></input>
                        </div>
                        <div class="relative">
                            <i class="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input type="text" placeholder="Location" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"></input>
                        </div>
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                            <i class="fas fa-search mr-2"></i>Search
                        </button>
                    </div>
                    
                    {/* <!-- Filter Tags --> */}
                    <div class="flex flex-wrap gap-2">
                        <button class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                            <i class="fas fa-filter mr-1"></i>All Filters
                        </button>
                        <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                            Available Today
                        </button>
                        <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                            Top Rated
                        </button>
                        <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                            Video Consultation
                        </button>
                        <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                            Insurance Accepted
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Specialties Section --> */}
    <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
            <h3 class="text-2xl font-bold text-gray-900 mb-8">Browse by Specialty</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div class="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 cursor-pointer">
                    <div class="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-heartbeat text-blue-600 text-xl"></i>
                    </div>
                    <h4 class="font-medium text-gray-900">Cardiology</h4>
                    <p class="text-sm text-gray-600">45 doctors</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 cursor-pointer">
                    <div class="bg-green-100 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-brain text-green-600 text-xl"></i>
                    </div>
                    <h4 class="font-medium text-gray-900">Neurology</h4>
                    <p class="text-sm text-gray-600">32 doctors</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 cursor-pointer">
                    <div class="bg-purple-100 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-baby text-purple-600 text-xl"></i>
                    </div>
                    <h4 class="font-medium text-gray-900">Pediatrics</h4>
                    <p class="text-sm text-gray-600">28 doctors</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 cursor-pointer">
                    <div class="bg-orange-100 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-bone text-orange-600 text-xl"></i>
                    </div>
                    <h4 class="font-medium text-gray-900">Orthopedic</h4>
                    <p class="text-sm text-gray-600">38 doctors</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 cursor-pointer">
                    <div class="bg-pink-100 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-female text-pink-600 text-xl"></i>
                    </div>
                    <h4 class="font-medium text-gray-900">Gynecology</h4>
                    <p class="text-sm text-gray-600">25 doctors</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 cursor-pointer">
                    <div class="bg-red-100 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <i class="fas fa-eye text-red-600 text-xl"></i>
                    </div>
                    <h4 class="font-medium text-gray-900">Ophthalmology</h4>
                    <p class="text-sm text-gray-600">22 doctors</p>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Doctors List --> */}
    <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center mb-8">
                <h3 class="text-2xl font-bold text-gray-900">Available Doctors</h3>
                <div class="flex items-center space-x-4">
                    <span class="text-gray-600">Showing <strong>1-12</strong> of <strong>156</strong> doctors</span>
                    <select class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Sort by: Recommended</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Rating: High to Low</option>
                        <option>Experience: High to Low</option>
                    </select>
                </div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* <!-- Doctor Card 1 --> */}
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="p-6">
                        <div class="flex items-start space-x-4">
                            <img src="https://picsum.photos/seed/doc1/100/100.jpg" alt="Dr. Sarah Johnson" class="w-20 h-20 rounded-lg object-cover"></img>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-900 text-lg">Dr. Sarah Johnson</h4>
                                <p class="text-blue-600 font-medium mb-1">Cardiologist</p>
                                <p class="text-gray-600 text-sm mb-2">15 years experience</p>
                                <div class="flex items-center mb-2">
                                    <div class="flex text-yellow-400 text-sm">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <span class="text-gray-600 text-sm ml-2">(4.9) 234 reviews</span>
                                </div>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Available Today</span>
                                    <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">Video Call</span>
                                </div>
                            </div>
                        </div>
                        <div class="border-t pt-4 mt-4">
                            <div class="flex justify-between items-center mb-3">
                                <div>
                                    <p class="text-gray-600 text-sm">Consultation Fee</p>
                                    <p class="text-2xl font-bold text-gray-900">$150</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-gray-600 text-sm">Next Available</p>
                                    <p class="font-medium text-gray-900">Today, 3:00 PM</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    Book Now
                                </button>
                                <button class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Doctor Card 2 --> */}
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="p-6">
                        <div class="flex items-start space-x-4">
                            <img src="https://picsum.photos/seed/doc2/100/100.jpg" alt="Dr. Michael Chen" class="w-20 h-20 rounded-lg object-cover"></img>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-900 text-lg">Dr. Michael Chen</h4>
                                <p class="text-blue-600 font-medium mb-1">Neurologist</p>
                                <p class="text-gray-600 text-sm mb-2">12 years experience</p>
                                <div class="flex items-center mb-2">
                                    <div class="flex text-yellow-400 text-sm">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <span class="text-gray-600 text-sm ml-2">(4.8) 189 reviews</span>
                                </div>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Available Today</span>
                                    <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">In-Person</span>
                                </div>
                            </div>
                        </div>
                        <div class="border-t pt-4 mt-4">
                            <div class="flex justify-between items-center mb-3">
                                <div>
                                    <p class="text-gray-600 text-sm">Consultation Fee</p>
                                    <p class="text-2xl font-bold text-gray-900">$180</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-gray-600 text-sm">Next Available</p>
                                    <p class="font-medium text-gray-900">Tomorrow, 10:00 AM</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    Book Now
                                </button>
                                <button class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Doctor Card 3 --> */}
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="p-6">
                        <div class="flex items-start space-x-4">
                            <img src="https://picsum.photos/seed/doc3/100/100.jpg" alt="Dr. Emily Davis" class="w-20 h-20 rounded-lg object-cover"></img>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-900 text-lg">Dr. Emily Davis</h4>
                                <p class="text-blue-600 font-medium mb-1">Pediatrician</p>
                                <p class="text-gray-600 text-sm mb-2">8 years experience</p>
                                <div class="flex items-center mb-2">
                                    <div class="flex text-yellow-400 text-sm">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <span class="text-gray-600 text-sm ml-2">(4.7) 156 reviews</span>
                                </div>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">Tomorrow</span>
                                    <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">Video Call</span>
                                    <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Insurance</span>
                                </div>
                            </div>
                        </div>
                        <div class="border-t pt-4 mt-4">
                            <div class="flex justify-between items-center mb-3">
                                <div>
                                    <p class="text-gray-600 text-sm">Consultation Fee</p>
                                    <p class="text-2xl font-bold text-gray-900">$120</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-gray-600 text-sm">Next Available</p>
                                    <p class="font-medium text-gray-900">Tomorrow, 2:00 PM</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    Book Now
                                </button>
                                <button class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Doctor Card 4 --> */}
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="p-6">
                        <div class="flex items-start space-x-4">
                            <img src="https://picsum.photos/seed/doc4/100/100.jpg" alt="Dr. Robert Wilson" class="w-20 h-20 rounded-lg object-cover"></img>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-900 text-lg">Dr. Robert Wilson</h4>
                                <p class="text-blue-600 font-medium mb-1">Orthopedic</p>
                                <p class="text-gray-600 text-sm mb-2">20 years experience</p>
                                <div class="flex items-center mb-2">
                                    <div class="flex text-yellow-400 text-sm">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <span class="text-gray-600 text-sm ml-2">(4.9) 312 reviews</span>
                                </div>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Available Today</span>
                                    <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">In-Person</span>
                                </div>
                            </div>
                        </div>
                        <div class="border-t pt-4 mt-4">
                            <div class="flex justify-between items-center mb-3">
                                <div>
                                    <p class="text-gray-600 text-sm">Consultation Fee</p>
                                    <p class="text-2xl font-bold text-gray-900">$200</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-gray-600 text-sm">Next Available</p>
                                    <p class="font-medium text-gray-900">Today, 4:30 PM</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    Book Now
                                </button>
                                <button class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Doctor Card 5 --> */}
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="p-6">
                        <div class="flex items-start space-x-4">
                            <img src="https://picsum.photos/seed/doc5/100/100.jpg" alt="Dr. Lisa Anderson" class="w-20 h-20 rounded-lg object-cover"></img>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-900 text-lg">Dr. Lisa Anderson</h4>
                                <p class="text-blue-600 font-medium mb-1">Gynecologist</p>
                                <p class="text-gray-600 text-sm mb-2">10 years experience</p>
                                <div class="flex items-center mb-2">
                                    <div class="flex text-yellow-400 text-sm">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <span class="text-gray-600 text-sm ml-2">(4.6) 198 reviews</span>
                                </div>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">Tomorrow</span>
                                    <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">Video Call</span>
                                </div>
                            </div>
                        </div>
                        <div class="border-t pt-4 mt-4">
                            <div class="flex justify-between items-center mb-3">
                                <div>
                                    <p class="text-gray-600 text-sm">Consultation Fee</p>
                                    <p class="text-2xl font-bold text-gray-900">$140</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-gray-600 text-sm">Next Available</p>
                                    <p class="font-medium text-gray-900">Tomorrow, 11:00 AM</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    Book Now
                                </button>
                                <button class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Doctor Card 6 --> */}
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="p-6">
                        <div class="flex items-start space-x-4">
                            <img src="https://picsum.photos/seed/doc6/100/100.jpg" alt="Dr. James Martinez" class="w-20 h-20 rounded-lg object-cover"></img>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-900 text-lg">Dr. James Martinez</h4>
                                <p class="text-blue-600 font-medium mb-1">Ophthalmologist</p>
                                <p class="text-gray-600 text-sm mb-2">14 years experience</p>
                                <div class="flex items-center mb-2">
                                    <div class="flex text-yellow-400 text-sm">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <span class="text-gray-600 text-sm ml-2">(4.8) 267 reviews</span>
                                </div>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Available Today</span>
                                    <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">In-Person</span>
                                    <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Insurance</span>
                                </div>
                            </div>
                        </div>
                        <div class="border-t pt-4 mt-4">
                            <div class="flex justify-between items-center mb-3">
                                <div>
                                    <p class="text-gray-600 text-sm">Consultation Fee</p>
                                    <p class="text-2xl font-bold text-gray-900">$160</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-gray-600 text-sm">Next Available</p>
                                    <p class="font-medium text-gray-900">Today, 5:00 PM</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    Book Now
                                </button>
                                <button class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Pagination --> */}
            <div class="flex justify-center items-center mt-12 space-x-2">
                <button class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">2</button>
                <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">3</button>
                <span class="px-4 py-2">...</span>
                <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">13</button>
                <button class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </section>

    </div>
  )
}

export default Doctors
