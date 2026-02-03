import React from 'react'

function Contact() {
  return (
    <>
      <section class="bg-linear-to-br from-blue-600 to-green-400 text-white py-20">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
                <p class="text-xl mb-8 text-blue-100">We're here to help you with all your healthcare needs. Reach out to us anytime.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button class="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                        <i class="fas fa-phone mr-2"></i>Call Us Now
                    </button>
                    <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                        <i class="fas fa-envelope mr-2"></i>Send Email
                    </button>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Contact Information Cards --> */}
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* <!-- Phone Contact --> */}
                <div class="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-phone text-blue-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Phone Support</h3>
                    <p class="text-gray-600 mb-4">Call us for immediate assistance</p>
                    <div class="space-y-2">
                        <p class="text-lg font-semibold text-gray-900">+1 234 567 8900</p>
                        <p class="text-sm text-gray-600">Mon-Fri: 8AM-8PM</p>
                        <p class="text-sm text-gray-600">Sat-Sun: 9AM-6PM</p>
                    </div>
                    <button class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                        <i class="fas fa-phone mr-2"></i>Call Now
                    </button>
                </div>

                {/* <!-- Email Contact --> */}
                <div class="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-envelope text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Email Support</h3>
                    <p class="text-gray-600 mb-4">Send us an email for detailed inquiries</p>
                    <div class="space-y-2">
                        <p class="text-lg font-semibold text-gray-900">info@medicare.com</p>
                        <p class="text-sm text-gray-600">support@medicare.com</p>
                        <p class="text-sm text-gray-600">Response within 24 hours</p>
                    </div>
                    <button class="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                        <i class="fas fa-envelope mr-2"></i>Send Email
                    </button>
                </div>

                {/* <!-- Location --> */}
                <div class="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
                    <div class="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-map-marker-alt text-purple-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Visit Us</h3>
                    <p class="text-gray-600 mb-4">Come visit our main office</p>
                    <div class="space-y-2">
                        <p class="text-lg font-semibold text-gray-900">123 Medical Street</p>
                        <p class="text-sm text-gray-600">Healthcare District, City</p>
                        <p class="text-sm text-gray-600">State 12345, USA</p>
                    </div>
                    <button class="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                        <i class="fas fa-directions mr-2"></i>Get Directions
                    </button>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Contact Form and Map --> */}
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                {/* <!-- Contact Form --> */}
                <div class="bg-white rounded-xl shadow-lg p-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                    <form class="space-y-6" onsubmit="handleSubmit(event)">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John"></input>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Doe"></input>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com"></input>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+1 234 567 8900"></input>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select a subject</option>
                                <option value="appointment">Appointment Inquiry</option>
                                <option value="billing">Billing Question</option>
                                <option value="technical">Technical Support</option>
                                <option value="feedback">Feedback</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea rows="6" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell us how we can help you..."></textarea>
                        </div>

                        <div class="flex items-center">
                            <input type="checkbox" id="newsletter" class="mr-3"></input>
                            <label for="newsletter" class="text-sm text-gray-600">I'd like to receive health tips and updates</label>
                        </div>

                        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                            <i class="fas fa-paper-plane mr-2"></i>Send Message
                        </button>
                    </form>
                </div>

                {/* <!-- Map and Office Hours --> */}
                <div class="space-y-8">
                    {/* <!-- Map --> */}
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div class="h-96 bg-gray-200 relative">
                            {/* <!-- Placeholder for map --> */}
                            <div class="absolute inset-0 flex items-center justify-center bg-linear-to-br from-blue-100 to-green-100">
                                <div class="text-center">
                                    <i class="fas fa-map-marked-alt text-6xl text-blue-600 mb-4"></i>
                                    <p class="text-gray-700 font-medium">Interactive Map</p>
                                    <p class="text-sm text-gray-600">123 Medical Street, Healthcare District</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Office Hours --> */}
                    <div class="bg-white rounded-xl shadow-lg p-8">
                        <h3 class="text-xl font-bold text-gray-900 mb-6">Office Hours</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center py-3 border-b">
                                <span class="font-medium text-gray-900">Monday - Friday</span>
                                <span class="text-gray-600">8:00 AM - 8:00 PM</span>
                            </div>
                            <div class="flex justify-between items-center py-3 border-b">
                                <span class="font-medium text-gray-900">Saturday</span>
                                <span class="text-gray-600">9:00 AM - 6:00 PM</span>
                            </div>
                            <div class="flex justify-between items-center py-3 border-b">
                                <span class="font-medium text-gray-900">Sunday</span>
                                <span class="text-gray-600">9:00 AM - 6:00 PM</span>
                            </div>
                            <div class="flex justify-between items-center py-3">
                                <span class="font-medium text-gray-900">Emergency</span>
                                <span class="text-red-600 font-medium">24/7 Available</span>
                            </div>
                        </div>

                        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                            <div class="flex items-center">
                                <i class="fas fa-info-circle text-blue-600 mr-3"></i>
                                <div class="text-sm text-gray-700">
                                    <p class="font-medium">Emergency Hotline: <span class="text-blue-600">911</span></p>
                                    <p>For medical emergencies, please call 911 immediately.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- FAQ Section --> */}
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p class="text-xl text-gray-600">Find answers to common questions about our services</p>
            </div>

            <div class="max-w-3xl mx-auto space-y-4">
                <div class="bg-gray-50 rounded-xl p-6">
                    <button class="w-full text-left flex justify-between items-center" onclick="toggleFAQ(this)">
                        <h3 class="font-semibold text-gray-900">How do I book an appointment?</h3>
                        <i class="fas fa-chevron-down text-gray-600 transition-transform duration-200"></i>
                    </button>
                    <div class="hidden mt-4 text-gray-600">
                        <p>You can book an appointment through our website, mobile app, or by calling our support team. Simply select your preferred doctor, choose a date and time, and confirm your booking.</p>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                    <button class="w-full text-left flex justify-between items-center" onclick="toggleFAQ(this)">
                        <h3 class="font-semibold text-gray-900">What insurance plans do you accept?</h3>
                        <i class="fas fa-chevron-down text-gray-600 transition-transform duration-200"></i>
                    </button>
                    <div class="hidden mt-4 text-gray-600">
                        <p>We accept most major insurance plans including Medicare, Medicaid, and private insurance. Please contact our billing department to verify your specific coverage.</p>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                    <button class="w-full text-left flex justify-between items-center" onclick="toggleFAQ(this)">
                        <h3 class="font-semibold text-gray-900">Do you offer video consultations?</h3>
                        <i class="fas fa-chevron-down text-gray-600 transition-transform duration-200"></i>
                    </button>
                    <div class="hidden mt-4 text-gray-600">
                        <p>Yes, we offer secure video consultations for many types of appointments. You can schedule a virtual visit through our platform and connect with your doctor from home.</p>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                    <button class="w-full text-left flex justify-between items-center" onclick="toggleFAQ(this)">
                        <h3 class="font-semibold text-gray-900">How can I access my medical records?</h3>
                        <i class="fas fa-chevron-down text-gray-600 transition-transform duration-200"></i>
                    </button>
                    <div class="hidden mt-4 text-gray-600">
                        <p>Your medical records are available through our secure patient portal. You can log in to view test results, prescription history, and download your records anytime.</p>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                    <button class="w-full text-left flex justify-between items-center" onclick="toggleFAQ(this)">
                        <h3 class="font-semibold text-gray-900">What should I do in case of an emergency?</h3>
                        <i class="fas fa-chevron-down text-gray-600 transition-transform duration-200"></i>
                    </button>
                    <div class="hidden mt-4 text-gray-600">
                        <p>In case of a medical emergency, please call 911 immediately or go to the nearest emergency room. For urgent but non-life-threatening issues, you can call our emergency hotline.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Social Media Section --> */}
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Connect With Us</h2>
            <p class="text-xl text-gray-600 mb-8">Follow us on social media for health tips and updates</p>
            
            <div class="flex justify-center space-x-6 mb-8">
                <a href="#" class="bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200">
                    <i class="fab fa-facebook-f text-2xl"></i>
                </a>
                <a href="#" class="bg-blue-400 hover:bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200">
                    <i class="fab fa-twitter text-2xl"></i>
                </a>
                <a href="#" class="bg-pink-600 hover:bg-pink-700 text-white w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200">
                    <i class="fab fa-instagram text-2xl"></i>
                </a>
                <a href="#" class="bg-blue-700 hover:bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200">
                    <i class="fab fa-linkedin-in text-2xl"></i>
                </a>
                <a href="#" class="bg-red-600 hover:bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200">
                    <i class="fab fa-youtube text-2xl"></i>
                </a>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                <h3 class="text-xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h3>
                <p class="text-gray-600 mb-6">Get health tips, medical news, and exclusive offers delivered to your inbox</p>
                <form class="flex flex-col sm:flex-row gap-4" onsubmit="handleNewsletter(event)">
                    <input type="email" required placeholder="Enter your email address" class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    </section>
    </>
  )
}

export default Contact
