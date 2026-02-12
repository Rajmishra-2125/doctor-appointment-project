import api from "./api";

// Get current doctor's profile
const getDoctorDetails = async () => {
    const response = await api.get("/doctors/my-details");
    return response.data.data;
}

// Update doctor details
const updateDoctorDetails = async (doctorData) => {
    const response = await api.patch("/doctor/updateInfo", doctorData);
    if (response.data) {
      // Update the doctor info in user object in localStorage
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser) {
        currentUser.doctorInfo = response.data.data;
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
    }
}

const getDoctorsProfiles = async () => {
    const response = await api.get("/doctors/getDoctorprofiles");
    return response.data.data;
}


const docotrService = {
  getDoctorDetails,
  updateDoctorDetails,
  getDoctorsProfiles,
};

export default docotrService;