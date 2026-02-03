import React from 'react'

function About() {
  return (
    <>
      <section class="bg-linear-to-br from-blue-600 to-green-400 text-white py-20">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">About MediCare</h2>
            <p class="text-xl mb-8 text-blue-100">
              Transforming healthcare through innovation, compassion, and
              excellence
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                <i class="fas fa-play-circle mr-2"></i>Watch Our Story
              </button>
              <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                <i class="fas fa-download mr-2"></i>Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Our Story --> */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p class="text-lg text-gray-600 mb-6">
                Founded in 2010, MediCare began with a simple mission: to make
                quality healthcare accessible to everyone. What started as a
                small clinic with just 5 doctors has grown into a comprehensive
                healthcare network serving thousands of patients across the
                region.
              </p>
              <p class="text-lg text-gray-600 mb-6">
                Our journey has been driven by innovation and a deep commitment
                to patient care. We pioneered telemedicine in our region,
                implemented cutting-edge electronic health records, and built a
                network of over 500 specialized doctors to serve diverse medical
                needs.
              </p>
              <p class="text-lg text-gray-600 mb-8">
                Today, MediCare stands as a beacon of excellence in healthcare,
                combining the latest medical technology with compassionate care
                to deliver outstanding patient outcomes.
              </p>
              <div class="grid grid-cols-3 gap-6">
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 mb-2">14+</div>
                  <div class="text-sm text-gray-600">Years of Service</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div class="text-sm text-gray-600">Expert Doctors</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 mb-2">100K+</div>
                  <div class="text-sm text-gray-600">Happy Patients</div>
                </div>
              </div>
            </div>
            <div class="relative">
              <img
                src="https://picsum.photos/seed/medical-team/600/400.jpg"
                alt="Our Medical Team"
                class="rounded-xl shadow-xl"
              ></img>
              <div class="absolute -bottom-6 -right-6 bg-blue-600 text-white rounded-xl p-6 shadow-lg">
                <div class="text-3xl font-bold mb-2">24/7</div>
                <div class="text-sm">Emergency Care Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Mission & Vision --> */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* <!-- Mission --> */}
            <div class="bg-white rounded-xl shadow-lg p-8">
              <div class="bg-blue-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                <i class="fas fa-bullseye text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p class="text-gray-600 mb-4">
                To provide exceptional healthcare services that are accessible,
                affordable, and delivered with compassion. We strive to improve
                the health and well-being of our community through innovative
                medical solutions and patient-centered care.
              </p>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                  <i class="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span>
                    Deliver world-class medical care with advanced technology
                  </span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span>Make healthcare accessible to all communities</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span>
                    Foster innovation in medical treatments and procedures
                  </span>
                </li>
              </ul>
            </div>

            {/* <!-- Vision --> */}
            <div class="bg-white rounded-xl shadow-lg p-8">
              <div class="bg-purple-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                <i class="fas fa-eye text-purple-600 text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p class="text-gray-600 mb-4">
                To be the leading healthcare provider recognized for excellence,
                innovation, and compassionate care. We envision a future where
                quality healthcare is a right, not a privilege, and where
                technology bridges all gaps in medical access.
              </p>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                  <i class="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span>Lead in healthcare innovation and research</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span>
                    Create healthier communities through preventive care
                  </span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span>
                    Set new standards in patient experience and outcomes
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Core Values --> */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p class="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div class="text-center">
              <div class="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-heart text-red-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Compassion</h3>
              <p class="text-gray-600">
                We treat every patient with empathy, dignity, and respect,
                understanding that healing involves both body and soul.
              </p>
            </div>

            <div class="text-center">
              <div class="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-award text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p class="text-gray-600">
                We pursue the highest standards in medical care, continuously
                improving our skills and adopting best practices.
              </p>
            </div>

            <div class="text-center">
              <div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-lightbulb text-green-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p class="text-gray-600">
                We embrace new technologies and creative solutions to advance
                healthcare delivery and patient outcomes.
              </p>
            </div>

            <div class="text-center">
              <div class="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-users text-purple-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p class="text-gray-600">
                We operate with honesty, transparency, and ethical principles in
                all our interactions and decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Leadership Team --> */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p class="text-xl text-gray-600">
              Meet the experts guiding our healthcare excellence
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* <!-- CEO --> */}
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/ceo/300/300.jpg"
                alt="CEO"
                class="w-full h-48 object-cover"
              ></img>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-1">
                  Dr. Sarah Mitchell
                </h3>
                <p class="text-blue-600 font-medium mb-3">
                  Chief Executive Officer
                </p>
                <p class="text-gray-600 text-sm mb-4">
                  With over 20 years in healthcare leadership, Dr. Mitchell
                  brings vision and expertise to guide MediCare's growth.
                </p>
                <div class="flex space-x-3">
                  <a
                    href="#"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <i class="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* <!-- Medical Director --> */}
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/medical-director/300/300.jpg"
                alt="Medical Director"
                class="w-full h-48 object-cover"
              ></img>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-1">
                  Dr. James Chen
                </h3>
                <p class="text-blue-600 font-medium mb-3">Medical Director</p>
                <p class="text-gray-600 text-sm mb-4">
                  Board-certified physician with expertise in internal medicine
                  and healthcare quality improvement.
                </p>
                <div class="flex space-x-3">
                  <a
                    href="#"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <i class="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* <!-- CTO --> */}
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/cto/300/300.jpg"
                alt="CTO"
                class="w-full h-48 object-cover"
              ></img>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-1">
                  Michael Rodriguez
                </h3>
                <p class="text-blue-600 font-medium mb-3">
                  Chief Technology Officer
                </p>
                <p class="text-gray-600 text-sm mb-4">
                  Technology visionary driving digital transformation and
                  innovation in healthcare delivery systems.
                </p>
                <div class="flex space-x-3">
                  <a
                    href="#"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <i class="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* <!-- Head of Nursing --> */}
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://picsum.photos/seed/nursing-director/300/300.jpg"
                alt="Head of Nursing"
                class="w-full h-48 object-cover"
              ></img>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-1">
                  Emily Thompson
                </h3>
                <p class="text-blue-600 font-medium mb-3">Head of Nursing</p>
                <p class="text-gray-600 text-sm mb-4">
                  Dedicated nursing leader ensuring highest standards of patient
                  care and nursing excellence.
                </p>
                <div class="flex space-x-3">
                  <a
                    href="#"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <i class="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Achievements & Awards --> */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Achievements & Awards
            </h2>
            <p class="text-xl text-gray-600">
              Recognition for our commitment to healthcare excellence
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div class="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center">
              <div class="bg-yellow-400 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-trophy text-yellow-600 text-3xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Best Hospital Award
              </h3>
              <p class="text-gray-600 mb-2">
                National Healthcare Excellence Awards
              </p>
              <p class="text-sm text-gray-500">2023</p>
            </div>

            <div class="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-8 text-center">
              <div class="bg-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-certificate text-white text-3xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                ISO 9001 Certified
              </h3>
              <p class="text-gray-600 mb-2">Quality Management Systems</p>
              <p class="text-sm text-gray-500">2022</p>
            </div>

            <div class="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center">
              <div class="bg-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-star text-white text-3xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Patient Choice Award
              </h3>
              <p class="text-gray-600 mb-2">Highest Patient Satisfaction</p>
              <p class="text-sm text-gray-500">2023</p>
            </div>

            <div class="bg-linear-to-br from-red-50 to-red-100 rounded-xl p-8 text-center">
              <div class="bg-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-heart text-white text-3xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Emergency Care Excellence
              </h3>
              <p class="text-gray-600 mb-2">Regional Emergency Services</p>
              <p class="text-sm text-gray-500">2022</p>
            </div>

            <div class="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-8 text-center">
              <div class="bg-orange-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-graduation-cap text-white text-3xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Teaching Hospital
              </h3>
              <p class="text-gray-600 mb-2">Medical Education Excellence</p>
              <p class="text-sm text-gray-500">2021</p>
            </div>

            <div class="bg-linear-to-br from-indigo-50 to-indigo-100 rounded-xl p-8 text-center">
              <div class="bg-indigo-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-shield-alt text-white text-3xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Safety Excellence
              </h3>
              <p class="text-gray-600 mb-2">Patient Safety Standards</p>
              <p class="text-sm text-gray-500">2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Partners & Affiliations --> */}
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partners & Affiliations
            </h2>
            <p class="text-xl text-gray-600">
              Proud to collaborate with leading healthcare organizations
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <div class="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-lg transition-shadow duration-300">
              <div class="text-center">
                <i class="fas fa-hospital text-blue-600 text-2xl mb-2"></i>
                <p class="text-sm font-medium text-gray-700">
                  Medical Association
                </p>
              </div>
            </div>
            <div class="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-lg transition-shadow duration-300">
              <div class="text-center">
                <i class="fas fa-university text-green-600 text-2xl mb-2"></i>
                <p class="text-sm font-medium text-gray-700">
                  University Medical
                </p>
              </div>
            </div>
            <div class="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-lg transition-shadow duration-300">
              <div class="text-center">
                <i class="fas fa-flask text-purple-600 text-2xl mb-2"></i>
                <p class="text-sm font-medium text-gray-700">
                  Research Institute
                </p>
              </div>
            </div>
            <div class="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-lg transition-shadow duration-300">
              <div class="text-center">
                <i class="fas fa-heartbeat text-red-600 text-2xl mb-2"></i>
                <p class="text-sm font-medium text-gray-700">
                  Cardiology Network
                </p>
              </div>
            </div>
            <div class="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-lg transition-shadow duration-300">
              <div class="text-center">
                <i class="fas fa-pills text-orange-600 text-2xl mb-2"></i>
                <p class="text-sm font-medium text-gray-700">Pharma Partners</p>
              </div>
            </div>
            <div class="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-lg transition-shadow duration-300">
              <div class="text-center">
                <i class="fas fa-shield-alt text-indigo-600 text-2xl mb-2"></i>
                <p class="text-sm font-medium text-gray-700">
                  Healthcare Alliance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- CTA Section --> */}
      <section class="py-16 bg-linear-to-r from-blue-600 to-green-400 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            Join Our Healthcare Family
          </h2>
          <p class="text-xl mb-8 text-blue-100">
            Whether you're a patient seeking care or a professional looking to
            join our team, we welcome you to be part of our mission.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
              <i class="fas fa-user-plus mr-2"></i>Become a Patient
            </button>
            <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
              <i class="fas fa-briefcase mr-2"></i>Career Opportunities
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default About
