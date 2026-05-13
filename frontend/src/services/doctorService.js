import api from "./api";

// Get current doctor's profile
const getDoctorDetails = async () => {
    const response = await api.get("/doctors/my-profile");
    return response.data.data;
}

// Update doctor details
const updateDoctorDetails = async (doctorData) => {
    const response = await api.patch("/doctors/updateInfo", doctorData);
    if (response.data) {
      // Update the doctor info in user object in localStorage
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser) {
        currentUser.doctorInfo = response.data.data;
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
    }
}

const getDoctorsProfiles = async () => {
    const response = await api.get("/doctors/profiles");
    return response.data.data || [];
}

// Alias for backwards compatibility
const getAllDoctors = getDoctorsProfiles;


const docotrService = {
  getDoctorDetails,
  updateDoctorDetails,
  getDoctorsProfiles,
  getAllDoctors, // Add the new function
};

export default docotrService;