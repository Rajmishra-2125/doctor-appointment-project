import React from "react";
import {
  Heart,
  Users,
  Award,
  Clock,
  Shield,
  Star,
  Target,
  Eye,
} from "lucide-react";

function About() {
  const stats = [
    { icon: Users, value: "50,000+", label: "Happy Patients" },
    { icon: Award, value: "500+", label: "Expert Doctors" },
    { icon: Clock, value: "24/7", label: "Available Support" },
    { icon: Star, value: "4.9/5", label: "Patient Rating" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description:
        "We put patients first, ensuring personalized and compassionate healthcare services tailored to individual needs.",
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description:
        "We maintain the highest standards of medical ethics, privacy, and confidentiality in all our services.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We partner with certified and experienced doctors committed to delivering exceptional medical care.",
    },
    {
      icon: Users,
      title: "Accessibility",
      description:
        "We make quality healthcare accessible to everyone through our easy-to-use appointment booking platform.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      specialization: "Cardiology",
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Surgery",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      specialization: "General Surgery",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Pediatrics Lead",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      specialization: "Pediatrics",
    },
    {
      name: "Dr. James Anderson",
      role: "Orthopedic Specialist",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      specialization: "Orthopedics",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About MediCare
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your trusted partner in connecting patients with quality
              healthcare professionals
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To revolutionize healthcare accessibility by providing a seamless,
              user-friendly platform that connects patients with qualified
              medical professionals. We strive to make quality healthcare
              convenient, affordable, and accessible to everyone, regardless of
              their location or circumstances.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 rounded-full p-3 mr-4">
                <Eye className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Our Vision
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To become the leading healthcare appointment platform globally,
              setting new standards in patient care and medical service
              delivery. We envision a world where every individual has immediate
              access to the right medical expertise at the right time,
              empowering them to take control of their health journey.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white dark:bg-gray-900 py-16 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              MediCare was founded in 2020 with a simple yet powerful idea:
              healthcare should be accessible to everyone. Our founders, a team
              of healthcare professionals and technology experts, recognized the
              challenges patients face when trying to book appointments with
              doctors. Long wait times, complicated booking processes, and
              limited access to specialist information were common pain points.
            </p>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              Today, MediCare serves thousands of patients daily, connecting
              them with a network of over 500 certified doctors across multiple
              specialties. We've streamlined the appointment booking process,
              making it as simple as a few clicks. Our platform continues to
              evolve, incorporating the latest technology while maintaining our
              core commitment to patient care and satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do at MediCare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 dark:bg-gray-900 py-20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Experienced healthcare professionals dedicated to your well-being
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {member.specialization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust MediCare for their
            healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/doctors"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Find a Doctor
            </a>
            <a
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all border-2 border-white/50"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
