import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Clock,
  Award,
  GraduationCap,
  Heart,
  Brain,
  Eye,
  Activity,
  Stethoscope,
  Bone,
  Baby,
  Users,
  TrendingUp,
  CheckCircle,
  Video,
  X,
} from "lucide-react";

function Doctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Specialties for filtering
  const specialties = [
    { name: "All", icon: Stethoscope },
    { name: "Cardiology", icon: Heart },
    { name: "Neurology", icon: Brain },
    { name: "Orthopedics", icon: Bone },
    { name: "Ophthalmology", icon: Eye },
    { name: "Pediatrics", icon: Baby },
    { name: "Dermatology", icon: Activity },
    { name: "General Medicine", icon: Stethoscope },
  ];

  // Comprehensive doctors data
  const allDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Smith",
      specialty: "Cardiology",
      subSpecialty: "Interventional Cardiology",
      experience: 15,
      rating: 4.9,
      reviews: 342,
      patients: 2500,
      education: "MD, Harvard Medical School",
      languages: ["English", "Spanish"],
      location: "New York Medical Center",
      availability: "Mon, Wed, Fri",
      nextAvailable: "2026-02-06",
      consultationFee: 150,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
      about:
        "Specialized in treating complex cardiac conditions with over 15 years of experience.",
      achievements: ["Board Certified", "Award Winner 2024", "500+ Surgeries"],
      videoConsult: true,
    },
    {
      id: 2,
      name: "Dr. Michael Johnson",
      specialty: "Neurology",
      subSpecialty: "Clinical Neurophysiology",
      experience: 12,
      rating: 4.8,
      reviews: 289,
      patients: 1800,
      education: "MD, Johns Hopkins University",
      languages: ["English", "French"],
      location: "Central Hospital",
      availability: "Tue, Thu, Sat",
      nextAvailable: "2026-02-07",
      consultationFee: 140,
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
      about:
        "Expert in neurological disorders and brain health with extensive research background.",
      achievements: [
        "Published Author",
        "Research Leader",
        "Top Neurologist 2025",
      ],
      videoConsult: true,
    },
    {
      id: 3,
      name: "Dr. Emily Lee",
      specialty: "Dermatology",
      subSpecialty: "Cosmetic Dermatology",
      experience: 10,
      rating: 4.9,
      reviews: 456,
      patients: 2200,
      education: "MD, Stanford University",
      languages: ["English", "Mandarin"],
      location: "Skin Care Institute",
      availability: "Mon, Tue, Thu",
      nextAvailable: "2026-02-05",
      consultationFee: 120,
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
      about:
        "Passionate about skin health and cosmetic procedures with a gentle approach.",
      achievements: [
        "Aesthetic Excellence Award",
        "1000+ Happy Patients",
        "Media Featured",
      ],
      videoConsult: true,
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      subSpecialty: "Sports Medicine",
      experience: 18,
      rating: 5.0,
      reviews: 521,
      patients: 3000,
      education: "MD, Yale School of Medicine",
      languages: ["English"],
      location: "Sports Medicine Center",
      availability: "Mon, Wed, Fri, Sat",
      nextAvailable: "2026-02-06",
      consultationFee: 160,
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
      about:
        "Leading orthopedic surgeon specializing in sports-related injuries and joint replacement.",
      achievements: [
        "Olympic Team Physician",
        "Innovation Award",
        "2000+ Surgeries",
      ],
      videoConsult: false,
    },
    {
      id: 5,
      name: "Dr. Olivia Martinez",
      specialty: "Pediatrics",
      subSpecialty: "Child Development",
      experience: 8,
      rating: 4.7,
      reviews: 198,
      patients: 1200,
      education: "MD, Columbia University",
      languages: ["English", "Spanish"],
      location: "Children's Health Center",
      availability: "Tue, Wed, Thu",
      nextAvailable: "2026-02-08",
      consultationFee: 100,
      image:
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400",
      about:
        "Caring pediatrician focused on preventive care and child wellness.",
      achievements: ["Child Care Excellence", "Community Service Award"],
      videoConsult: true,
    },
    {
      id: 6,
      name: "Dr. David Chen",
      specialty: "Ophthalmology",
      subSpecialty: "Retinal Surgery",
      experience: 14,
      rating: 4.9,
      reviews: 367,
      patients: 2100,
      education: "MD, Duke University",
      languages: ["English", "Mandarin", "Cantonese"],
      location: "Eye Care Specialists",
      availability: "Mon, Tue, Fri",
      nextAvailable: "2026-02-07",
      consultationFee: 145,
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400",
      about: "Expert in advanced eye care and cutting-edge retinal treatments.",
      achievements: [
        "Laser Surgery Pioneer",
        "Patient Choice Award",
        "500+ Eye Surgeries",
      ],
      videoConsult: true,
    },
    {
      id: 7,
      name: "Dr. Rachel Thompson",
      specialty: "General Medicine",
      subSpecialty: "Family Practice",
      experience: 20,
      rating: 4.8,
      reviews: 612,
      patients: 4500,
      education: "MD, University of Michigan",
      languages: ["English"],
      location: "Community Health Clinic",
      availability: "Mon, Tue, Wed, Thu, Fri",
      nextAvailable: "2026-02-05",
      consultationFee: 90,
      image:
        "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400",
      about:
        "Experienced family doctor providing comprehensive primary care for all ages.",
      achievements: [
        "20 Years Service",
        "Community Hero Award",
        "Top Family Doctor",
      ],
      videoConsult: true,
    },
    {
      id: 8,
      name: "Dr. Robert Kumar",
      specialty: "Cardiology",
      subSpecialty: "Electrophysiology",
      experience: 16,
      rating: 4.9,
      reviews: 423,
      patients: 2800,
      education: "MD, Mayo Clinic",
      languages: ["English", "Hindi"],
      location: "Heart Institute",
      availability: "Tue, Thu, Sat",
      nextAvailable: "2026-02-09",
      consultationFee: 155,
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
      about:
        "Specialist in cardiac rhythm disorders and pacemaker implantation.",
      achievements: [
        "Heart Health Champion",
        "Research Excellence",
        "1000+ Procedures",
      ],
      videoConsult: true,
    },
    {
      id: 9,
      name: "Dr. Amanda White",
      specialty: "Neurology",
      subSpecialty: "Headache & Pain Medicine",
      experience: 9,
      rating: 4.6,
      reviews: 234,
      patients: 1500,
      education: "MD, Northwestern University",
      languages: ["English"],
      location: "Neurology Associates",
      availability: "Mon, Wed, Fri",
      nextAvailable: "2026-02-10",
      consultationFee: 135,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
      about:
        "Dedicated to helping patients manage chronic pain and neurological conditions.",
      achievements: ["Pain Management Expert", "Patient Satisfaction Award"],
      videoConsult: true,
    },
    {
      id: 10,
      name: "Dr. Christopher Lee",
      specialty: "Orthopedics",
      subSpecialty: "Joint Replacement",
      experience: 22,
      rating: 5.0,
      reviews: 589,
      patients: 3500,
      education: "MD, Cleveland Clinic",
      languages: ["English", "Korean"],
      location: "Orthopedic Center of Excellence",
      availability: "Mon, Thu, Fri",
      nextAvailable: "2026-02-06",
      consultationFee: 170,
      image:
        "https://images.unsplash.com/photo-1613500235600-883d15c3b1ec?w=400",
      about:
        "Renowned joint replacement surgeon with exceptional patient outcomes.",
      achievements: [
        "Lifetime Achievement",
        "3000+ Joint Replacements",
        "Innovation Leader",
      ],
      videoConsult: false,
    },
    {
      id: 11,
      name: "Dr. Lisa Anderson",
      specialty: "Dermatology",
      subSpecialty: "Medical Dermatology",
      experience: 11,
      rating: 4.8,
      reviews: 378,
      patients: 1900,
      education: "MD, UCSF",
      languages: ["English", "German"],
      location: "Dermatology Clinic",
      availability: "Tue, Wed, Sat",
      nextAvailable: "2026-02-08",
      consultationFee: 125,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      about:
        "Focuses on treating complex skin conditions and skin cancer prevention.",
      achievements: [
        "Skin Cancer Awareness",
        "Published Researcher",
        "Top Dermatologist",
      ],
      videoConsult: true,
    },
    {
      id: 12,
      name: "Dr. Thomas Brown",
      specialty: "Pediatrics",
      subSpecialty: "Neonatal Care",
      experience: 13,
      rating: 4.9,
      reviews: 445,
      patients: 2300,
      education: "MD, Boston Children's Hospital",
      languages: ["English"],
      location: "Pediatric Specialists",
      availability: "Mon, Tue, Thu, Fri",
      nextAvailable: "2026-02-07",
      consultationFee: 110,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
      about: "Expert in newborn care and high-risk infant management.",
      achievements: [
        "NICU Excellence",
        "Lifesaver Award",
        "1000+ Newborns Treated",
      ],
      videoConsult: true,
    },
  ];

  // Filter doctors based on search and filters
  const filteredDoctors = allDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;

    const matchesExperience =
      selectedExperience === "All" ||
      (selectedExperience === "0-5" && doctor.experience <= 5) ||
      (selectedExperience === "6-10" &&
        doctor.experience >= 6 &&
        doctor.experience <= 10) ||
      (selectedExperience === "11-15" &&
        doctor.experience >= 11 &&
        doctor.experience <= 15) ||
      (selectedExperience === "16+" && doctor.experience >= 16);

    const matchesRating =
      selectedRating === "All" ||
      (selectedRating === "4.5+" && doctor.rating >= 4.5) ||
      (selectedRating === "4.8+" && doctor.rating >= 4.8) ||
      (selectedRating === "4.9+" && doctor.rating >= 4.9);

    return (
      matchesSearch && matchesSpecialty && matchesExperience && matchesRating
    );
  });

  const clearFilters = () => {
    setSelectedSpecialty("All");
    setSelectedExperience("All");
    setSelectedRating("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Doctor
          </h1>
          <p className="text-xl text-blue-100">
            Browse our network of experienced healthcare professionals
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by doctor name, specialty, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          <div
            className={`${showFilters ? "block" : "hidden"} lg:block mt-4 space-y-4`}
          >
            <div className="grid md:grid-cols-3 gap-4">
              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty.name} value={specialty.name}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Experience</option>
                  <option value="0-5">0-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-15">11-15 years</option>
                  <option value="16+">16+ years</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Ratings</option>
                  <option value="4.5+">4.5+ Stars</option>
                  <option value="4.8+">4.8+ Stars</option>
                  <option value="4.9+">4.9+ Stars</option>
                </select>
              </div>
            </div>

            {/* Active Filters and Clear */}
            {(selectedSpecialty !== "All" ||
              selectedExperience !== "All" ||
              selectedRating !== "All" ||
              searchQuery) && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {selectedSpecialty !== "All" && (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {selectedSpecialty}
                      <button
                        onClick={() => setSelectedSpecialty("All")}
                        className="hover:text-blue-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {selectedExperience !== "All" && (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {selectedExperience} years
                      <button
                        onClick={() => setSelectedExperience("All")}
                        className="hover:text-green-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {selectedRating !== "All" && (
                    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      {selectedRating} Rating
                      <button
                        onClick={() => setSelectedRating("All")}
                        className="hover:text-yellow-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredDoctors.length}
            </span>{" "}
            doctors
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              <div className="w-5 h-5 flex flex-col gap-1">
                <div className="h-1 bg-current rounded"></div>
                <div className="h-1 bg-current rounded"></div>
                <div className="h-1 bg-current rounded"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Doctors Grid/List */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear all filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Doctor Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {doctor.videoConsult && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      Video Available
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">
                      {doctor.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({doctor.reviews})
                    </span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-1">
                    {doctor.specialty}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {doctor.subSpecialty}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{doctor.patients}+ patients treated</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="text-lg font-bold text-gray-900">
                        ${doctor.consultationFee}
                      </p>
                    </div>
                    <Link
                      to="/doctors/appointments"
                      state={{ doctor: doctor }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Doctor Image */}
                  <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                    {doctor.videoConsult && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        Video
                      </div>
                    )}
                  </div>

                  {/* Doctor Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {doctor.name}
                        </h3>
                        <p className="text-blue-600 font-semibold mb-1">
                          {doctor.specialty}
                        </p>
                        <p className="text-sm text-gray-600">
                          {doctor.subSpecialty}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-2 md:mt-0">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-lg font-bold">
                          {doctor.rating}
                        </span>
                        <span className="text-gray-500">
                          ({doctor.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{doctor.about}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500 text-xs">Education</p>
                          <p className="font-medium text-gray-900 truncate">
                            {doctor.education.split(",")[0]}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500 text-xs">Experience</p>
                          <p className="font-medium text-gray-900">
                            {doctor.experience} years
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500 text-xs">Location</p>
                          <p className="font-medium text-gray-900 truncate">
                            {doctor.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-500 text-xs">Available</p>
                          <p className="font-medium text-gray-900">
                            {doctor.availability.split(",")[0]}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      {doctor.achievements
                        .slice(0, 3)
                        .map((achievement, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            <CheckCircle className="w-3 h-3" />
                            {achievement}
                          </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-sm text-gray-500">
                            Consultation Fee
                          </p>
                          <p className="text-xl font-bold text-gray-900">
                            ${doctor.consultationFee}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Next Available
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {doctor.nextAvailable}
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/doctors/appointments"
                        state={{ doctor: doctor }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Doctors;
