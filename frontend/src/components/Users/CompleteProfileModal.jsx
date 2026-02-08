import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileAddress } from '../../features/auth/authSlice';
import { X, MapPin, Save, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CompleteProfileModal = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    
    // Form state just for address fields
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    useEffect(() => {
        // Check if user is logged in
        if (!user) return;

        // Check if session dismissed
        if (sessionStorage.getItem('completeProfileDismissed') === 'true') {
            return;
        }

        // Check for missing fields. 
        // We consider it incomplete if city or country is missing.
        const address = user.address || {};
        const isIncomplete = !address.city || !address.country;

        if (isIncomplete) {
            setIsOpen(true);
            // Pre-fill existing data to avoid overwriting with blanks if they have some but not all
            setFormData({
                street: address.street || '',
                city: address.city || '',
                state: address.state || '',
                zipCode: address.zipCode || '',
                country: address.country || ''
            });
        }
    }, [user]);

    const handleDismiss = () => {
        setIsOpen(false);
        sessionStorage.setItem('completeProfileDismissed', 'true');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.city || !formData.country) {
            toast.error("City and Country are required to complete your profile.");
            return;
        }

        try {
            // We need to send the current user data merged with new address data
            // BUT our authSlice/service might just send the payload we give it.
            // Let's verify what updateProfile expects.
            // It sends whatever we give it to the backend.
            // The backend updateAccountDetails now expects explicit fields.
            // So we can send just the address fields + required fullname/email if backend validates them?
            // Backend validation: if(!fullname || !email) throw error.
            // So we MUST send fullname and email even if we are only updating address.
            
            const payload = {
                ...formData, // street, city, etc.
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth
            };

            await dispatch(updateProfileAddress(payload)).unwrap();
            toast.success("Profile updated successfully!");
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error(error?.message || "Failed to update profile");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <AlertCircle className="w-6 h-6" />
                            Complete Your Profile
                        </h2>
                        <p className="text-blue-100 text-sm mt-1">
                            Please provide your location details to get better doctor recommendations.
                        </p>
                    </div>
                    <button 
                        onClick={handleDismiss}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="123 Main St"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="New York"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="NY"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="10001"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="USA"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={handleDismiss}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                        >
                            Skip for Now
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-blue-500/30 transition-all flex justify-center items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Save Details
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompleteProfileModal;
