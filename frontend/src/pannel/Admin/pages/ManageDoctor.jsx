import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getAllDoctors, 
  approveDoctor, 
  rejectDoctor, 
  deleteDoctor, 
  createDoctor,
  reset 
} from '../../../features/admin/adminSlice';
import { 
  Search, 
  Filter, 
  UserRound, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  Eye,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  X,
  UserPlus
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageDoctor = () => {
  const dispatch = useDispatch();
  const { doctors, isLoading, isError, message, isSuccess } = useSelector((state) => state.admin);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [specFilter, setSpecFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Create Form State
  const [doctorForm, setDoctorForm] = useState({
    fullname: "",
    email: "",
    password: "password123",
    phone: "",
    gender: "MALE",
    specialization: "",
    experience: "",
    consultationFee: "",
    licenseNumber: "",
    clinicName: "MediCare Clinic"
  });

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      dispatch(reset());
    }
    if (isError && message) {
      toast.error(message);
      dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch]);

  const specializations = useMemo(() => {
    if (!doctors) return [];
    const specs = doctors.map(d => d.specialization).filter(Boolean);
    return ["all", ...new Set(specs)];
  }, [doctors]);

  const { pendingDoctors, approvedDoctors } = useMemo(() => {
    if (!doctors) return { pendingDoctors: [], approvedDoctors: [] };
    
    const filtered = doctors.filter(doc => {
      const nameMatch = doc.doctorId?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        doc.doctor?.toLowerCase().includes(searchTerm.toLowerCase());
      const emailMatch = doc.doctorId?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const specMatch = specFilter === "all" || doc.specialization === specFilter;
      
      let statusMatch = true;
      if (statusFilter === "approved") statusMatch = doc.isVerified === true;
      else if (statusFilter === "pending") statusMatch = doc.isVerified === false;
      
      return (nameMatch || emailMatch) && specMatch && statusMatch;
    });

    return {
      pendingDoctors: filtered.filter(d => !d.isVerified),
      approvedDoctors: filtered.filter(d => d.isVerified)
    };
  }, [doctors, searchTerm, specFilter, statusFilter]);

  const stats = useMemo(() => {
    if (!doctors) return { total: 0, approved: 0, pending: 0 };
    return {
      total: doctors.length,
      approved: doctors.filter(d => d.isVerified).length,
      pending: doctors.filter(d => !d.isVerified).length
    };
  }, [doctors]);

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createDoctor(doctorForm)).unwrap();
      setShowCreateModal(false);
      setDoctorForm({
        fullname: "", email: "", password: "password123", phone: "", 
        gender: "MALE", specialization: "", experience: "", 
        consultationFee: "", licenseNumber: "", clinicName: "MediCare Clinic"
      });
    } catch (err) {
      // Errors are handled by the global useEffect via isError state
    }
  };

  const handleApprove = async (id) => {
    try {
      await dispatch(approveDoctor(id)).unwrap();
    } catch (err) {
      // Handled by useEffect
    }
  };

  const handleReject = async (id) => {
    try {
      await dispatch(rejectDoctor(id)).unwrap();
    } catch (err) {
      // Handled by useEffect
    }
  };

  const handleDelete = async () => {
    if (!selectedDoctor) return;
    try {
      await dispatch(deleteDoctor(selectedDoctor._id)).unwrap();
      setShowDeleteModal(false);
      setSelectedDoctor(null);
    } catch (err) {
      // Handled by useEffect
    }
  };

  if (isLoading && !doctors?.length) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-fade-in pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Manage Doctors</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm">Review applications and manage doctor profiles</p>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          Add New Doctor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Doctors", value: stats.total, icon: UserRound, color: "indigo" },
          { label: "Approved Providers", value: stats.approved, icon: ShieldCheck, color: "emerald" },
          { label: "Pending Review", value: stats.pending, icon: Clock, color: "amber" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-500/10`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-[15px] outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <select 
              value={specFilter}
              onChange={(e) => setSpecFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm capitalize"
            >
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec === "all" ? "All Specializations" : spec}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm capitalize"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Review</option>
            </select>
            <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Pending Applications Section */}
      {pendingDoctors.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Pending Applications
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-600 text-xs font-black">{pendingDoctors.length}</span>
            </h2>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Applicant</th>
                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Specialization</th>
                    <th className="px-6 py-4 text-[11px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest text-right">Review Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                  {pendingDoctors.map((doc) => (
                    <tr key={doc._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center overflow-hidden border border-white dark:border-slate-800 shadow-sm relative group-hover:scale-105 transition-transform">
                            {doc.doctorId?.profileImage ? (
                              <img src={doc.doctorId.profileImage} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <UserRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{doc.doctorId?.fullname || doc.doctor}</p>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase font-bold tracking-tight">{doc.doctorId?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-tight border border-indigo-100/50 dark:border-indigo-500/20">
                          {doc.specialization}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleApprove(doc._id)}
                            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-90"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(doc._id)}
                            className="px-3 py-1.5 bg-white dark:bg-slate-800 text-amber-600 border border-amber-100 dark:border-amber-500/20 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-90"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                          </button>
                          <button 
                            onClick={() => { setSelectedDoctor(doc); setShowDetailModal(true); }}
                            className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Verified Provider Registry (Card Grid) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            Verified Provider Registry
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 text-xs font-black">{approvedDoctors.length}</span>
          </h2>
        </div>

        {approvedDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {approvedDoctors.map((doc) => (
              <div key={doc._id} className="bg-white dark:bg-slate-900 rounded-[24px] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group overflow-hidden relative">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-bl-[100px] -mr-8 -mt-8 group-hover:bg-indigo-600/10 transition-colors" />
                
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-20 h-20 rounded-[20px] bg-indigo-50 dark:bg-indigo-500/5 flex items-center justify-center overflow-hidden border-2 border-white dark:border-slate-800 shadow-lg shrink-0 relative">
                      {doc.doctorId?.profileImage ? (
                        <img src={doc.doctorId.profileImage} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <UserRound className="w-8 h-8 text-indigo-200" />
                      )}
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <h3 className="font-black text-gray-900 dark:text-white text-lg leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{doc.doctorId?.fullname || doc.doctor}</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3" />
                        {doc.specialization}
                      </p>
                      
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-600 text-[10px] font-black">
                          <span className="text-amber-500 text-xs">★</span>
                          {doc.rating || "5.0"}
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{doc.experience}y Experience</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50/50 dark:bg-slate-800/30 p-4 rounded-2xl border border-gray-100 dark:border-slate-800/50">
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Consultation</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-slate-200">${doc.consultationFee}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Hospital</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-slate-200 truncate">{doc.clinicName || "Private"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button 
                      onClick={() => { setSelectedDoctor(doc); setShowDetailModal(true); }}
                      className="flex-1 py-2.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-black transition-all border border-indigo-100/50 dark:border-indigo-500/20"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => { setSelectedDoctor(doc); setShowDeleteModal(true); }}
                      className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 p-12 text-center">
             <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-gray-300" />
             </div>
             <p className="text-gray-500 dark:text-slate-400 font-medium">No verified doctors found.</p>
             <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {(pendingDoctors.length === 0 && approvedDoctors.length === 0) && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-20 text-center border border-gray-100 dark:border-slate-800">
           <div className="max-w-xs mx-auto">
              <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No matching results</h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm">We couldn't find any doctors matching "{searchTerm}". Try clearing your filters.</p>
           </div>
        </div>
      )}

      {/* Modal: Create Doctor */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transform animate-in zoom-in-95 duration-300">
            <div className="px-8 py-5 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Register New Doctor</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleCreateDoctor} className="p-8">
              <div className="grid grid-cols-2 gap-6">
                {/* Account Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest pl-1">Account Info</h4>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Full Name</label>
                    <input required type="text" value={doctorForm.fullname} onChange={e => setDoctorForm({...doctorForm, fullname: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Dr. Sarah Connor"/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Email Address</label>
                    <input required type="email" value={doctorForm.email} onChange={e => setDoctorForm({...doctorForm, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500" placeholder="sarah@medicare.com"/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Phone</label>
                    <input required type="tel" value={doctorForm.phone} onChange={e => setDoctorForm({...doctorForm, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500" placeholder="+91 9876543210"/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Gender</label>
                    <select value={doctorForm.gender} onChange={e => setDoctorForm({...doctorForm, gender: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500">
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                {/* Professional Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest pl-1">Professional Info</h4>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Specialization</label>
                    <input required type="text" value={doctorForm.specialization} onChange={e => setDoctorForm({...doctorForm, specialization: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Cardiologist"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Exp. (Years)</label>
                      <input required type="number" value={doctorForm.experience} onChange={e => setDoctorForm({...doctorForm, experience: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Consult Fee ($)</label>
                      <input required type="number" value={doctorForm.consultationFee} onChange={e => setDoctorForm({...doctorForm, consultationFee: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">License Number</label>
                    <input required type="text" value={doctorForm.licenseNumber} onChange={e => setDoctorForm({...doctorForm, licenseNumber: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500" placeholder="LIC-12345678"/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300">Clinic Name</label>
                    <input type="text" value={doctorForm.clinicName} onChange={e => setDoctorForm({...doctorForm, clinicName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500"/>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 flex gap-4">
                 <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-3.5 rounded-2xl font-bold text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all border border-gray-200 dark:border-slate-800">Cancel</button>
                 <button type="submit" className="flex-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20 active:scale-95">Complete Registration</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Detail View */}
      {showDetailModal && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden relative border border-gray-100 dark:border-slate-800 animate-in slide-in-from-bottom-5 duration-300">
              {/* Profile Background */}
              <div className={`h-32 bg-linear-to-r from-indigo-500 to-purple-600 dark:opacity-80`} />
              
              <button onClick={() => setShowDetailModal(false)} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all z-10">
                 <X className="w-5 h-5"/>
              </button>

              <div className="px-8 pb-8 relative">
                 <div className="flex justify-between items-end -mt-12 mb-6">
                    <div className="w-24 h-24 rounded-3xl border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800 overflow-hidden shadow-xl shrink-0">
                       {selectedDoctor.doctorId?.profileImage ? (
                          <img src={selectedDoctor.doctorId.profileImage} alt="" className="w-full h-full object-cover" />
                       ) : (
                          <UserRound className="w-full h-full p-6 text-gray-300" />
                       )}
                    </div>
                    <div className="flex gap-2 mb-2">
                       {selectedDoctor.isVerified ? (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-tighter">Verified Provider</span>
                       ) : (
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 rounded-lg text-[10px] font-black uppercase tracking-tighter">Under Review</span>
                       )}
                    </div>
                 </div>

                 <div className="space-y-1">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{selectedDoctor.doctorId?.fullname || selectedDoctor.doctor}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-xs tracking-widest">{selectedDoctor.specialization}</p>
                 </div>

                 <div className="grid grid-cols-2 gap-8 my-8 pb-8 border-b border-gray-100 dark:border-slate-800">
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800"><Briefcase className="w-4 h-4 text-gray-500" /></div>
                          <div>
                             <p className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">Experience</p>
                             <p className="text-sm font-bold text-gray-700 dark:text-slate-200">{selectedDoctor.experience} Years</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800"><DollarSign className="w-4 h-4 text-gray-500" /></div>
                          <div>
                             <p className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">Consultation</p>
                             <p className="text-sm font-bold text-gray-700 dark:text-slate-200">${selectedDoctor.consultationFee}</p>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800"><MapPin className="w-4 h-4 text-gray-500" /></div>
                          <div>
                             <p className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">Clinic</p>
                             <p className="text-sm font-bold text-gray-700 dark:text-slate-200 truncate max-w-[140px]">{selectedDoctor.clinicName || "Private"}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800"><Phone className="w-4 h-4 text-gray-500" /></div>
                          <div>
                             <p className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">Contact</p>
                             <p className="text-sm font-bold text-gray-700 dark:text-slate-200">{selectedDoctor.doctorId?.phone || "Private"}</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-black text-gray-400 tracking-widest pl-1">Professional Bio</h4>
                    <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed bg-gray-50 dark:bg-slate-800/50 p-4 rounded-3xl">
                       {selectedDoctor.bio || "No professional biography provided yet."}
                    </p>
                 </div>

                 <div className="mt-8 flex gap-3">
                    <button className="flex-1 py-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-[13px] font-bold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                       <Clock className="w-4 h-4" />
                       View Slots
                    </button>
                    {!selectedDoctor.isApproved && (
                       <button onClick={() => { handleApprove(selectedDoctor._id); setShowDetailModal(false); }} className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[13px] font-bold transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                          Approve Profile
                       </button>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-800 p-8 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                 <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Doctor?</h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                 Are you sure you want to remove <span className="font-bold text-gray-900 dark:text-white font-serif">Dr. {selectedDoctor?.doctorId?.fullname || selectedDoctor?.doctor}</span>? This action will permanently delete their account and profile.
              </p>
              <div className="flex gap-3">
                 <button onClick={() => { setShowDeleteModal(false); setSelectedDoctor(null); }} className="flex-1 py-3 font-bold text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-2xl transition-all">Cancel</button>
                 <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-500/20 active:scale-95">Delete Permanently</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctor;