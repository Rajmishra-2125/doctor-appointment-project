import api from './api';

// Register user
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post('/auth/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
    // Also storing accessToken if needed, but let's stick to storing the user object for now
    // Ideally we should store tokens securely.
  }

  // Return the user data
  return response.data.data.user;
};

// Logout user
const logout = async () => {
    try {
        await api.post('/users/logout');
    } catch (error) {
        console.error("Logout failed on server", error);
    }
  localStorage.removeItem('user');
};

// Update user details
const updateUser = async (userData) => {
  const response = await api.patch('/users/update-account', userData);

  if (response.data) {
    // Ideally update local storage user if necessary, or rely on fetching current-user
    // For now, let's update the stored user if the response contains the updated user object
     const currentUser = JSON.parse(localStorage.getItem('user'));
     const updatedUser = { ...currentUser, ...response.data.data };
     localStorage.setItem('user', JSON.stringify(updatedUser));
  }
  return response.data.data;
};

// Update user avatar
const updateAvatar = async (formData) => {
  const response = await api.patch('/users/update-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.data) {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      // response.data.data should be the full user object with new avatar
      const updatedUser = { ...currentUser, ...response.data.data };
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Update local storage
  }

  return response.data.data;
};

// Change password
const changePassword = async (userData) => {
  const response = await api.patch('/users/change-password', userData);
  return response.data;
};

// Delete account
const deleteAccount = async (data) => {
    // data might contain password for confirmation
    const response = await api.delete('/users/delete-account', { 
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    localStorage.removeItem('user');
    return response.data;
};

const recoverAccount = async (userData) => {
    const response = await api.post('/users/recover-account', userData);
    return response.data;
};

const authService = {
  register,
  logout,
  login,
  updateUser,
  updateAvatar,
  changePassword,
  deleteAccount,
  recoverAccount,
};

export default authService;
