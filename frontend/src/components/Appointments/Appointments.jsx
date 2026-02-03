import React from 'react'
import { Link } from 'react-router-dom'

function Appointments() {
  return (
    <div>
      {/* <!-- Breadcrumb --> */}
      <div class="bg-white border-b">
        <div class="container mx-auto px-4 py-3">
          <nav class="flex items-center space-x-2 text-sm">
            <Link src="" class="text-gray-900 hover:text-blue-600">
              Home
            </Link>
            <a href="" class="text-gray-600 hover:text-blue-600">
              Doctors
            </a>
            <span class="text-gray-900 font-medium">Book Appointment</span>
          </nav>
        </div>
      </div>

      {/* <!-- Main Content --> */}
      <main class="container mx-auto px-4 py-8">
        <div class="grid lg:grid-cols-3 gap-8">
          {/* <!-- Doctor Info Card --> */}
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div class="text-center mb-6">
                <img
                  src="https://picsum.photos/seed/doctor1/150/150.jpg"
                  alt="Dr. Sarah Johnson"
                  class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                ></img>
                <h2 class="text-xl font-bold text-gray-900 mb-2">
                  Dr. Sarah Johnson
                </h2>
                <p class="text-blue-600 font-medium mb-2">Cardiologist</p>
                <div class="flex items-center justify-center mb-3">
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <span class="text-gray-600 text-sm ml-2">
                    (4.9) 234 reviews
                  </span>
                </div>
                <p class="text-gray-600 text-sm mb-4">15 years experience</p>
              </div>

              <div class="border-t pt-4">
                <h3 class="font-semibold text-gray-900 mb-3">
                  Consultation Details
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Consultation Fee</span>
                    <span class="font-bold text-gray-900">$150</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Duration</span>
                    <span class="text-gray-900">30 minutes</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Type</span>
                    <span class="text-gray-900">Video Call</span>
                  </div>
                </div>
              </div>

              <div class="border-t pt-4 mt-4">
                <h3 class="font-semibold text-gray-900 mb-3">Available</h3>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <i class="fas fa-video mr-1"></i>Video Call
                  </span>
                  <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    <i class="fas fa-user-md mr-1"></i>In-Person
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Booking Form --> */}
          <div class="lg:col-span-2">
            <div class="bg-white rounded-xl shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Book Your Appointment
              </h2>

              {/* <!-- Progress Steps --> */}
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center">
                  <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                    1
                  </div>
                  <span class="ml-2 font-medium text-gray-900">
                    Select Date & Time
                  </span>
                </div>
                <div class="flex-1 h-1 bg-gray-200 mx-4"></div>
                <div class="flex items-center">
                  <div class="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center font-medium">
                    2
                  </div>
                  <span class="ml-2 text-gray-600">Patient Details</span>
                </div>
                <div class="flex-1 h-1 bg-gray-200 mx-4"></div>
                <div class="flex items-center">
                  <div class="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center font-medium">
                    3
                  </div>
                  <span class="ml-2 text-gray-600">Confirmation</span>
                </div>
              </div>

              {/* <!-- Step 1: Date & Time Selection --> */}
              <div class="space-y-6">
                {/* <!-- Consultation Type --> */}
                <div>
                  <label class="block text-gray-900 font-medium mb-3">
                    Consultation Type
                  </label>
                  <div class="grid grid-cols-2 gap-4">
                    <label class="border-2 border-blue-600 bg-blue-50 rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition-colors">
                      <div class="flex items-center">
                        <input
                          type="radio"
                          name="consultation-type"
                          value="video"
                          checked
                          class="mr-3"
                        ></input>
                        <div>
                          <div class="font-medium text-gray-900">
                            Video Consultation
                          </div>
                          <div class="text-sm text-gray-600">
                            Online via video call
                          </div>
                        </div>
                      </div>
                    </label>
                    <label class="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-colors">
                      <div class="flex items-center">
                        <input
                          type="radio"
                          name="consultation-type"
                          value="inperson"
                          class="mr-3"
                        ></input>
                        <div>
                          <div class="font-medium text-gray-900">
                            In-Person Visit
                          </div>
                          <div class="text-sm text-gray-600">
                            At clinic/hospital
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* <!-- Date Selection --> */}
                <div>
                  <label class="block text-gray-900 font-medium mb-3">
                    Select Date
                  </label>
                  <div class="grid grid-cols-7 gap-2 mb-4">
                    <div class="text-center text-sm font-medium text-gray-600 py-2">
                      Sun
                    </div>
                    <div class="text-center text-sm font-medium text-gray-600 py-2">
                      Mon
                    </div>
                    <div class="text-center text-sm font-medium text-gray-600 py-2">
                      Tue
                    </div>
                    <div class="text-center text-sm font-medium text-gray-600 py-2">
                      Wed
                    </div>
                    <div class="text-center text-sm font-medium text-gray-600 py-2">
                      Thu
                    </div>
                    <div class="text-center text-sm font-medium text-gray-600 py-2">
                      Fri
                    </div>
                    <div class="text-center text-sm font-medium text-gray-600 py-2">
                      Sat
                    </div>

                    {/* <!-- Calendar Days --> */}
                    <div class="text-center py-2 text-gray-400">28</div>
                    <div class="text-center py-2 text-gray-400">29</div>
                    <div class="text-center py-2 text-gray-400">30</div>
                    <div class="text-center py-2 text-gray-400">31</div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      1
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      2
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      3
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      4
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      5
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      6
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      7
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      8
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      9
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      10
                    </div>
                    <div class="text-center py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
                      11
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      12
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      13
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      14
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      15
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      16
                    </div>
                    <div class="text-center py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                      17
                    </div>
                  </div>
                </div>

                {/* <!-- Time Selection --> */}
                <div>
                  <label class="block text-gray-900 font-medium mb-3">
                    Select Time
                  </label>
                  <div class="grid grid-cols-4 gap-3">
                    <button class="border border-gray-200 rounded-lg py-3 px-4 hover:border-blue-600 hover:bg-blue-50 transition-colors text-center">
                      <div class="font-medium">9:00 AM</div>
                      <div class="text-xs text-gray-600">Available</div>
                    </button>
                    <button class="border border-gray-200 rounded-lg py-3 px-4 hover:border-blue-600 hover:bg-blue-50 transition-colors text-center">
                      <div class="font-medium">9:30 AM</div>
                      <div class="text-xs text-gray-600">Available</div>
                    </button>
                    <button class="border border-gray-200 rounded-lg py-3 px-4 hover:border-blue-600 hover:bg-blue-50 transition-colors text-center">
                      <div class="font-medium">10:00 AM</div>
                      <div class="text-xs text-gray-600">Available</div>
                    </button>
                    <button class="border border-gray-200 rounded-lg py-3 px-4 bg-gray-100 text-gray-400 cursor-not-allowed text-center">
                      <div class="font-medium">10:30 AM</div>
                      <div class="text-xs text-gray-600">Booked</div>
                    </button>
                    <button class="border border-gray-200 rounded-lg py-3 px-4 hover:border-blue-600 hover:bg-blue-50 transition-colors text-center">
                      <div class="font-medium">11:00 AM</div>
                      <div class="text-xs text-gray-600">Available</div>
                    </button>
                    <button class="border border-gray-200 rounded-lg py-3 px-4 hover:border-blue-600 hover:bg-blue-50 transition-colors text-center">
                      <div class="font-medium">11:30 AM</div>
                      <div class="text-xs text-gray-600">Available</div>
                    </button>
                    <button class="border border-gray-200 rounded-lg py-3 px-4 bg-gray-100 text-gray-400 cursor-not-allowed text-center">
                      <div class="font-medium">2:00 PM</div>
                      <div class="text-xs text-gray-600">Booked</div>
                    </button>
                    <button class="border border-blue-600 bg-blue-50 rounded-lg py-3 px-4 text-center">
                      <div class="font-medium text-blue-600">2:30 PM</div>
                      <div class="text-xs text-blue-600">Selected</div>
                    </button>
                    <button class="border border-gray-200 rounded-lg py-3 px-4 hover:border-blue-600 hover:bg-blue-50 transition-colors text-center">
                      <div class="font-medium">3:00 PM</div>
                      <div class="text-xs text-gray-600">Available</div>
                    </button>
                    <button class="border border-gray-200 rounded-lg py-3 px-4 hover:border-blue-600 hover:bg-blue-50 transition-colors text-center">
                      <div class="font-medium">3:30 PM</div>
                      <div class="text-xs text-gray-600">Available</div>
                    </button>
                    <button class="border border-gray-200 rounded-lg py-3 px-4 hover:border-blue-600 hover:bg-blue-50 transition-colors text-center">
                      <div class="font-medium">4:00 PM</div>
                      <div class="text-xs text-gray-600">Available</div>
                    </button>
                    <button class="border border-gray-200 rounded-lg py-3 px-4 hover:border-blue-600 hover:bg-blue-50 transition-colors text-center">
                      <div class="font-medium">4:30 PM</div>
                      <div class="text-xs text-gray-600">Available</div>
                    </button>
                  </div>
                </div>

                {/* <!-- Reason for Visit --> */}
                <div>
                  <label class="block text-gray-900 font-medium mb-3">
                    Reason for Visit
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Please describe your symptoms or reason for consultation..."
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* <!-- Action Buttons --> */}
                <div class="flex justify-between pt-6">
                  <button class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                    <i class="fas fa-arrow-left mr-2"></i>Back
                  </button>
                  <button
                    class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                    onclick="proceedToStep2()"
                  >
                    Continue to Patient Details
                    <i class="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* <!-- Important Information --> */}
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-6">
              <div class="flex items-start">
                <i class="fas fa-info-circle text-yellow-600 text-xl mr-3 mt-1"></i>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-2">
                    Important Information
                  </h3>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>
                      • Please arrive 10 minutes before your scheduled
                      appointment
                    </li>
                    <li>• Bring your ID and insurance card if applicable</li>
                    <li>
                      • Video consultation link will be sent 30 minutes before
                      appointment
                    </li>
                    <li>
                      • Cancellation must be done at least 2 hours before
                      appointment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Appointments
