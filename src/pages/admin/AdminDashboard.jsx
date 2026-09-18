import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, GraduationCap, Calendar, Users, FileSpreadsheet,
  HelpCircle, ShieldAlert, CheckCircle2, XCircle, TrendingUp,
  LogOut, Download, ClipboardList, Image as ImageIcon, Settings as SettingsIcon,
  Layers, Key, Plus, Trash2, Edit, Check, Eye, RefreshCw, X
} from 'lucide-react';
import { api } from '../../utils/api';

const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80';

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    visitorsToday: 142,
    visitorsThisWeek: 980,
    visitorsThisMonth: 3840,
    activeClasses: 0,
    totalClasses: 0,
    upcomingEvents: 0,
    totalEnrollments: 0,
    newEnrollmentRequests: 0,
    communityMembers: 0,
    pendingCommunityProfiles: 0,
    accessRequests: 0,
    newQueries: 0,
    totalInstructors: 0,
    totalGallery: 0,
  });

  // Module data states
  const [requestsList, setRequestsList] = useState([]);
  const [accessRequestsList, setAccessRequestsList] = useState([]);
  const [classesList, setClassesList] = useState([]);
  const [communityMemberList, setCommunityMemberList] = useState([]);
  const [communityStatusFilter, setCommunityStatusFilter] = useState('ALL');
  const [eventsList, setEventsList] = useState([]);
  const [instructorsList, setInstructorsList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [queriesList, setQueriesList] = useState([]);

  const [loading, setLoading] = useState(true);

  // Modal State for CRUD operations
  const [modalType, setModalType] = useState(null); // 'addClass' | 'editClass' | 'addEvent' | 'editEvent' | 'addInstructor' | 'editInstructor' | 'addMember' | 'editMember' | 'addGallery' | 'editGallery'
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageUploading, setImageUploading] = useState(false);

  const fetchDashboardStats = () => {
    api.get('/api/admin/dashboard')
      .then((res) => {
        if (res?.success && res?.data) {
          setStats((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch((e) => console.warn('Dashboard stats note:', e.message));
  };

  const fetchEnrollments = () => {
    api.get('/api/enrollments')
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          setRequestsList(res.data);
        }
      })
      .catch((e) => console.warn('Enrollments note:', e.message));
  };

  const fetchAccessRequests = () => {
    api.get('/api/community/admin/access-requests')
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          setAccessRequestsList(res.data);
        }
      })
      .catch((e) => console.warn('Access requests note:', e.message));
  };

  const fetchClasses = () => {
    return api.get('/api/classes')
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          setClassesList(res.data);
        }
      })
      .catch((e) => console.warn('Classes fetch note:', e.message));
  };

  const fetchCommunityMembers = () => {
    api.get('/api/community/admin/leads')
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          setCommunityMemberList(res.data);
        }
      })
      .catch((e) => console.warn('Community members note:', e.message));
  };

  const fetchEvents = () => {
    api.get('/api/events')
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          setEventsList(res.data);
        }
      })
      .catch((e) => console.warn('Events note:', e.message));
  };

  const fetchInstructors = () => {
    api.get('/api/instructors')
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          setInstructorsList(res.data);
        }
      })
      .catch((e) => console.warn('Instructors note:', e.message));
  };

  const fetchGallery = () => {
    api.get('/api/gallery/admin')
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          setGalleryList(res.data);
        }
      })
      .catch((e) => console.warn('Gallery note:', e.message));
  };

  const fetchServices = () => {
    api.get('/api/admin/services')
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          setServicesList(res.data);
        }
      })
      .catch((e) => console.warn('Services note:', e.message));
  };

  const fetchQueries = () => {
    api.get('/api/queries')
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          setQueriesList(res.data);
        }
      })
      .catch((e) => console.warn('Queries note:', e.message));
  };

  const refreshAllData = () => {
    setLoading(true);
    fetchDashboardStats();
    fetchEnrollments();
    fetchAccessRequests();
    fetchClasses();
    fetchCommunityMembers();
    fetchEvents();
    fetchInstructors();
    fetchGallery();
    fetchServices();
    fetchQueries();
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      refreshAllData();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className={`pt-32 pb-24 min-h-screen flex items-center justify-center transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
        <div className={`max-w-md w-full p-8 rounded-2xl border text-center shadow-2xl ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200'}`}>
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">Admin Access Required</h2>
          <p className="text-sm opacity-80 mb-6">
            Please log in with administrator credentials to access Geet Studio Admin Dashboard.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all cursor-pointer shadow-lg"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  // Action Handlers
  const handleUpdateEnrollmentStatus = (id, newStatus) => {
    setRequestsList((prev) =>
      prev.map((item) => (item._id === id || item.enrollmentId === id ? { ...item, requestStatus: newStatus } : item))
    );
    api.patch(`/api/enrollments/${id}/status`, { status: newStatus })
      .then(() => fetchDashboardStats())
      .catch((e) => console.warn('Status update API error:', e.message));
  };

  const handleUpdateMemberStatus = (id, newStatus) => {
    setCommunityMemberList((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
    );
    api.patch(`/api/community/admin/leads/${id}/status`, { status: newStatus })
      .then(() => fetchDashboardStats())
      .catch((e) => console.warn('Member status error:', e.message));
  };

  const handleUpdateQueryStatus = (id, newStatus) => {
    setQueriesList((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
    );
    api.patch(`/api/queries/${id}/status`, { status: newStatus })
      .then(() => fetchDashboardStats())
      .catch((e) => console.warn('Query status error:', e.message));
  };

  // Delete handlers
  const handleDeleteClass = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    try {
      await api.delete(`/api/classes/${id}`);
      fetchClasses();
      fetchDashboardStats();
    } catch (err) {
      alert(err.message || 'Failed to delete class');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/api/events/${id}`);
      fetchEvents();
      fetchDashboardStats();
    } catch (err) {
      alert(err.message || 'Failed to delete event');
    }
  };

  const handleDeleteInstructor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this instructor?')) return;
    try {
      await api.delete(`/api/instructors/${id}`);
      fetchInstructors();
      fetchDashboardStats();
    } catch (err) {
      alert(err.message || 'Failed to delete instructor');
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Community Member?')) return;
    try {
      await api.delete(`/api/community/admin/leads/${id}`);
      fetchCommunityMembers();
      fetchDashboardStats();
    } catch (err) {
      alert(err.message || 'Failed to delete member');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await api.delete(`/api/gallery/${id}`);
      fetchGallery();
      fetchDashboardStats();
    } catch (err) {
      alert(err.message || 'Failed to delete gallery item');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/api/admin/services/${id}`);
      fetchServices();
    } catch (err) {
      alert(err.message || 'Failed to delete service');
    }
  };

  // Modal Submit Handlers
  const handleSaveClass = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'addClass') {
        const { _id, id, createdAt, updatedAt, ...createData } = formData;
        await api.post('/api/classes', createData);
      } else if (modalType === 'editClass') {
        await api.put(`/api/classes/${selectedItem._id}`, formData);
      }
      setModalType(null);
      await fetchClasses();
      fetchDashboardStats();
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'addEvent') {
        await api.post('/api/events', formData);
      } else if (modalType === 'editEvent') {
        await api.put(`/api/events/${selectedItem._id}`, formData);
      }
      setModalType(null);
      fetchEvents();
      fetchDashboardStats();
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleSaveInstructor = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'addInstructor') {
        await api.post('/api/instructors', formData);
      } else if (modalType === 'editInstructor') {
        await api.put(`/api/instructors/${selectedItem._id}`, formData);
      }
      setModalType(null);
      fetchInstructors();
      fetchDashboardStats();
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleSaveMember = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'addMember') {
        await api.post('/api/community/admin/leads', formData);
      } else if (modalType === 'editMember') {
        await api.put(`/api/community/admin/leads/${selectedItem._id}`, formData);
      }
      setModalType(null);
      fetchCommunityMembers();
      fetchDashboardStats();
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleSaveGallery = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'addGallery') {
        await api.post('/api/gallery', formData);
      } else if (modalType === 'editGallery') {
        await api.put(`/api/gallery/${selectedItem._id}`, formData);
      }
      setModalType(null);
      fetchGallery();
      fetchDashboardStats();
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleGalleryUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const fileData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const response = await api.post('/api/upload', { file: fileData, folder: 'geet_studio/gallery' });
      if (!response?.success || !response.data?.url) throw new Error(response?.message || 'Media upload failed');
      setFormData((prev) => ({
        ...prev,
        mediaUrl: response.data.url,
        publicId: response.data.publicId,
        mediaType: file.type.startsWith('video/') ? 'video' : 'image',
      }));
    } catch (error) {
      alert(error.message || 'Media upload failed');
    } finally {
      setImageUploading(false);
      event.target.value = '';
    }
  };

  const handleThumbnailUpload = async (event, targetField = 'images') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const fileData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const response = await api.post('/api/upload', { file: fileData, folder: 'geet_studio/classes' });
      if (!response?.success || !response.data?.url) {
        throw new Error(response?.message || 'Image upload failed');
      }
      setFormData((prev) => ({
        ...prev,
        [targetField]: targetField === 'images'
          ? [{ url: response.data.url, publicId: response.data.publicId }]
          : { url: response.data.url, publicId: response.data.publicId },
      }));
    } catch (error) {
      alert(error.message || 'Image upload failed');
    } finally {
      setImageUploading(false);
      event.target.value = '';
    }
  };

  const handleRemoveThumbnail = (targetField = 'images') => {
    setFormData((prev) => ({ ...prev, [targetField]: targetField === 'images' ? [] : {} }));
  };

  const handleExportExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Visitors Today,${stats.visitorsToday}\n`
      + `Visitors This Week,${stats.visitorsThisWeek}\n`
      + `Visitors This Month,${stats.visitorsThisMonth}\n`
      + `Active Classes,${stats.activeClasses}\n`
      + `Total Enrollment Requests,${requestsList.length}\n`
      + `Community Members,${stats.communityMembers}\n`
      + `Access Requests,${accessRequestsList.length}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Geet_Studio_Analytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`pt-28 pb-24 min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Admin Header */}
        <div className={`p-6 md:p-8 rounded-2xl border mb-8 flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 rounded uppercase tracking-wider">
                Admin Portal
              </span>
              <span className="text-xs opacity-60">• Studio Management</span>
            </div>
            <h1 className="font-heading text-3xl font-bold">
              Geet Studio <span className="text-gold-500 font-light italic">Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshAllData}
              className="flex items-center gap-2 px-3 py-2 border border-dark-600 hover:bg-dark-800 text-xs font-semibold rounded transition-all cursor-pointer"
              title="Refresh MongoDB Data"
            >
              <RefreshCw className="w-4 h-4 text-gold-500" /> Refresh
            </button>
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded transition-all shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export Analytics
            </button>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center gap-2 px-4 py-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-semibold uppercase rounded transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <p className="text-xs uppercase font-semibold opacity-60 mb-1">Active Classes</p>
            <p className="font-heading text-3xl font-bold text-gold-500">{stats.activeClasses}</p>
            <p className="text-[11px] opacity-70 mt-2">Total Classes: {classesList.length}</p>
          </div>

          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <p className="text-xs uppercase font-semibold opacity-60 mb-1">Enrollment Requests</p>
            <p className="font-heading text-3xl font-bold text-gold-500">{requestsList.length}</p>
            <p className="text-[11px] opacity-70 mt-2">{requestsList.filter(r => r.requestStatus === 'NEW').length} New Pending Requests</p>
          </div>

          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <p className="text-xs uppercase font-semibold opacity-60 mb-1">Community Members</p>
            <p className="font-heading text-3xl font-bold text-emerald-400">{communityMemberList.filter(m => m.status === 'APPROVED').length}</p>
            <p className="text-[11px] opacity-70 mt-2">{communityMemberList.filter(m => m.status === 'PENDING').length} Pending Approval</p>
          </div>

          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <p className="text-xs uppercase font-semibold opacity-60 mb-1">Access Requests</p>
            <p className="font-heading text-3xl font-bold text-amber-400">{accessRequestsList.length}</p>
            <p className="text-[11px] opacity-70 mt-2">{queriesList.filter(q => q.status === 'NEW').length} New General Enquiries</p>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-dark-700/40 pb-4 mb-8">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'classes', label: 'Classes', icon: GraduationCap },
            { id: 'workshops', label: 'Workshops', icon: GraduationCap },
            { id: 'enrollments', label: 'Enrollments', icon: ClipboardList },
            { id: 'community', label: 'Community Members', icon: Users },
            { id: 'access-requests', label: 'Access Requests', icon: Key },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'instructors', label: 'Instructors', icon: Users },
            { id: 'gallery', label: 'Gallery', icon: ImageIcon },
            { id: 'queries', label: 'Enquiries', icon: HelpCircle },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: SettingsIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gold-500 text-dark-950 shadow-md'
                    : isDark
                    ? 'bg-dark-800 text-warm-100 hover:bg-dark-700'
                    : 'bg-warm-100 text-dark-900 hover:bg-warm-200'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* 1. DASHBOARD OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-xl font-bold text-gold-500 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" /> Recent Enrollment Requests ({requestsList.length})
                </h3>
                <button onClick={() => setActiveTab('enrollments')} className="text-xs text-gold-500 hover:underline uppercase font-bold">
                  Manage All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-dark-700 text-gold-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Class</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestsList.length === 0 ? (
                      <tr><td colSpan="5" className="py-6 text-center opacity-60">No enrollment requests stored yet.</td></tr>
                    ) : (
                      requestsList.slice(0, 5).map((req) => (
                        <tr key={req._id || req.enrollmentId} className="border-b border-dark-700/30">
                          <td className="py-3.5 px-4 font-bold">{req.studentName}</td>
                          <td className="py-3.5 px-4">{req.className || (req.classId?.name) || 'General Class'}</td>
                          <td className="py-3.5 px-4 opacity-80">{req.phone} • {req.email}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                              req.requestStatus === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                              req.requestStatus === 'CONTACTED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
                              'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            }`}>
                              {req.requestStatus || 'NEW'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={req.requestStatus || 'NEW'}
                              onChange={(e) => handleUpdateEnrollmentStatus(req._id || req.enrollmentId, e.target.value)}
                              className={`text-xs px-2 py-1 rounded border ${isDark ? 'bg-dark-800 border-dark-600 text-warm-50' : 'bg-warm-100 border-warm-300'}`}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. CLASSES TAB */}
        {activeTab === 'classes' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-gold-500">Classes Management</h3>
                <p className="text-xs opacity-70">Manage active and upcoming dance classes offered at Geet Studio.</p>
              </div>
              <button
                onClick={() => {
                  setFormData({ name: '', type: 'class', description: '', classTiming: '6:00 PM - 7:00 PM', location: 'Geet Studio, Indore', fees: 3000, registrationStatus: 'OPEN' });
                  setModalType('addClass');
                }}
                className="px-4 py-2 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1 hover:bg-gold-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Class
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-dark-700 text-gold-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Class Title</th>
                    <th className="py-3 px-4">Timing</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Fees</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classesList.filter(c => c.type !== 'workshop').length === 0 ? (
                    <tr><td colSpan="6" className="py-6 text-center opacity-60">No classes stored in database yet.</td></tr>
                  ) : (
                    classesList.filter(c => c.type !== 'workshop').map((cls) => (
                      <tr key={cls._id} className="border-b border-dark-700/30">
                        <td className="py-3.5 px-4 font-bold">{cls.name || cls.title}</td>
                        <td className="py-3.5 px-4">{cls.classTiming || 'Regular Batch'}</td>
                        <td className="py-3.5 px-4 opacity-80">{cls.location || 'Indore'}</td>
                        <td className="py-3.5 px-4 font-mono text-gold-400">₹{cls.fees || cls.finalPayableAmount || 3000}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                            cls.registrationStatus === 'OPEN' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                          }`}>
                            {cls.registrationStatus || 'OPEN'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 flex items-center gap-2">
                          <button
                            onClick={() => { setSelectedItem(cls); setFormData(cls); setModalType('editClass'); }}
                            className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(cls._id)}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. WORKSHOPS TAB */}
        {activeTab === 'workshops' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-gold-500">Workshops Management</h3>
                <p className="text-xs opacity-70">Manage special weekend and masterclass workshops.</p>
              </div>
              <button
                onClick={() => {
                  setFormData({ name: '', type: 'workshop', description: '', classTiming: 'Weekend Special', location: 'Geet Studio, Indore', fees: 1500, registrationStatus: 'OPEN' });
                  setModalType('addClass');
                }}
                className="px-4 py-2 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1 hover:bg-gold-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Workshop
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-dark-700 text-gold-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Workshop Name</th>
                    <th className="py-3 px-4">Timing</th>
                    <th className="py-3 px-4">Fees</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classesList.filter(c => c.type === 'workshop').length === 0 ? (
                    <tr><td colSpan="5" className="py-6 text-center opacity-60">No workshops registered yet.</td></tr>
                  ) : (
                    classesList.filter(c => c.type === 'workshop').map((wk) => (
                      <tr key={wk._id} className="border-b border-dark-700/30">
                        <td className="py-3.5 px-4 font-bold">{wk.name || wk.title}</td>
                        <td className="py-3.5 px-4">{wk.classTiming || 'Weekend'}</td>
                        <td className="py-3.5 px-4 font-mono text-gold-400">₹{wk.fees || 1500}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                            wk.registrationStatus === 'OPEN' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                          }`}>
                            {wk.registrationStatus || 'OPEN'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 flex items-center gap-2">
                          <button
                            onClick={() => { setSelectedItem(wk); setFormData(wk); setModalType('editClass'); }}
                            className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(wk._id)}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. ENROLLMENTS TAB */}
        {activeTab === 'enrollments' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-xl font-bold text-gold-500 mb-4">Enrollment Requests</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-dark-700 text-gold-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Request ID</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Message</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {requestsList.length === 0 ? (
                    <tr><td colSpan="8" className="py-6 text-center opacity-60">No enrollment requests found.</td></tr>
                  ) : (
                    requestsList.map((req) => (
                      <tr key={req._id || req.enrollmentId} className="border-b border-dark-700/30">
                        <td className="py-3.5 px-4 font-mono text-gold-400">{req.enrollmentId || req._id}</td>
                        <td className="py-3.5 px-4 font-bold">{req.studentName}</td>
                        <td className="py-3.5 px-4">{req.className || (req.classId?.name) || 'Studio Class'}</td>
                        <td className="py-3.5 px-4">{req.phone}</td>
                        <td className="py-3.5 px-4">{req.email}</td>
                        <td className="py-3.5 px-4 max-w-xs truncate">{req.message || '-'}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                            req.requestStatus === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                            req.requestStatus === 'CONTACTED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
                            'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          }`}>
                            {req.requestStatus || 'NEW'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={req.requestStatus || 'NEW'}
                            onChange={(e) => handleUpdateEnrollmentStatus(req._id || req.enrollmentId, e.target.value)}
                            className={`text-xs px-2 py-1 rounded border ${isDark ? 'bg-dark-800 border-dark-600 text-warm-50' : 'bg-warm-100 border-warm-300'}`}
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. COMMUNITY MEMBERS TAB */}
        {activeTab === 'community' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-gold-500">Community Members Management</h3>
                <p className="text-xs opacity-70">Approve, reject, or edit community artist & choreographer profiles.</p>
              </div>
              <button
                onClick={() => {
                  setFormData({ name: '', profession: 'Choreographer', category: 'Dancers', bio: '', phone: '', email: '', status: 'APPROVED' });
                  setModalType('addMember');
                }}
                className="px-4 py-2 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1 hover:bg-gold-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Community Member
              </button>
            </div>

            <div className="mb-4 flex items-center gap-3 text-xs">
              <label htmlFor="community-status-filter" className="font-semibold uppercase tracking-wider text-gold-500">Filter Status</label>
              <select
                id="community-status-filter"
                value={communityStatusFilter}
                onChange={(e) => setCommunityStatusFilter(e.target.value)}
                className={`px-3 py-2 rounded border ${isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-100 border-warm-300 text-dark-950'}`}
              >
                <option value="ALL">ALL</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
                <option value="SUSPENDED">SUSPENDED</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-dark-700 text-gold-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Member Name</th>
                    <th className="py-3 px-4">Profession / Category</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {communityMemberList.length === 0 ? (
                    <tr><td colSpan="5" className="py-6 text-center opacity-60">No Community Members registered yet.</td></tr>
                  ) : (
                    communityMemberList
                      .filter((mem) => communityStatusFilter === 'ALL' || mem.status === communityStatusFilter)
                      .map((mem) => (
                      <tr key={mem._id} className="border-b border-dark-700/30">
                        <td className="py-3.5 px-4 font-bold">{mem.name}</td>
                        <td className="py-3.5 px-4">{mem.profession} • <span className="opacity-70">{mem.category}</span></td>
                        <td className="py-3.5 px-4 opacity-80">{mem.phone} • {mem.email}</td>
                        <td className="py-3.5 px-4">
                          <select
                            value={mem.status || 'PENDING'}
                            onChange={(e) => handleUpdateMemberStatus(mem._id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded border font-bold ${
                              mem.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                              mem.status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                              'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            }`}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REJECTED">REJECTED</option>
                            <option value="SUSPENDED">SUSPENDED</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 flex items-center gap-2">
                          <button
                            onClick={() => { setSelectedItem(mem); setFormData(mem); setModalType('editMember'); }}
                            className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(mem._id)}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. ACCESS REQUESTS TAB */}
        {activeTab === 'access-requests' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-xl font-bold text-gold-500 mb-2">Community Member Access Requests</h3>
            <p className="text-xs opacity-70 mb-4">Records of public visitors who requested contact details for approved Community Members.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-dark-700 text-gold-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Visitor Name</th>
                    <th className="py-3 px-4">Visitor Email</th>
                    <th className="py-3 px-4">Requested Community Member</th>
                    <th className="py-3 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {accessRequestsList.length === 0 ? (
                    <tr><td colSpan="4" className="py-6 text-center opacity-60">No access requests logged yet.</td></tr>
                  ) : (
                    accessRequestsList.map((acc) => (
                      <tr key={acc._id} className="border-b border-dark-700/30">
                        <td className="py-3.5 px-4 font-bold">{acc.visitorName}</td>
                        <td className="py-3.5 px-4">{acc.visitorEmail}</td>
                        <td className="py-3.5 px-4 text-gold-400 font-semibold">
                          {acc.communityMemberName || acc.communityLead?.name || 'Community Member'}
                        </td>
                        <td className="py-3.5 px-4 opacity-70">
                          {acc.createdAt ? new Date(acc.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'Recent'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. EVENTS TAB */}
        {activeTab === 'events' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-gold-500">Events Management</h3>
                <p className="text-xs opacity-70">Manage upcoming and past dance showcases, workshops & events.</p>
              </div>
              <button
                onClick={() => {
                  setFormData({ title: '', description: '', date: new Date().toISOString().split('T')[0], time: '7:00 PM', location: 'Geet Studio, Indore', type: 'Showcase', status: 'UPCOMING' });
                  setModalType('addEvent');
                }}
                className="px-4 py-2 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1 hover:bg-gold-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Event
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-dark-700 text-gold-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Event Title</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eventsList.length === 0 ? (
                    <tr><td colSpan="5" className="py-6 text-center opacity-60">No events stored in database yet.</td></tr>
                  ) : (
                    eventsList.map((ev) => (
                      <tr key={ev._id} className="border-b border-dark-700/30">
                        <td className="py-3.5 px-4 font-bold">{ev.title}</td>
                        <td className="py-3.5 px-4">{ev.date ? new Date(ev.date).toLocaleDateString('en-IN') : 'TBA'} • {ev.time}</td>
                        <td className="py-3.5 px-4 opacity-80">{ev.location}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                            ev.status === 'UPCOMING' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-gray-500/20 text-gray-400 border border-gray-500/40'
                          }`}>
                            {ev.status || 'UPCOMING'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 flex items-center gap-2">
                          <button
                            onClick={() => { setSelectedItem(ev); setFormData(ev); setModalType('editEvent'); }}
                            className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(ev._id)}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 8. INSTRUCTORS TAB */}
        {activeTab === 'instructors' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-gold-500">Instructors Management</h3>
                <p className="text-xs opacity-70">Manage studio faculty and dance instructors.</p>
              </div>
              <button
                onClick={() => {
                  setFormData({ name: '', bio: '', experience: '5+ Years', specialization: ['Bollywood', 'Choreography'], active: true });
                  setModalType('addInstructor');
                }}
                className="px-4 py-2 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1 hover:bg-gold-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Instructor
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-dark-700 text-gold-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Instructor Name</th>
                    <th className="py-3 px-4">Specialization</th>
                    <th className="py-3 px-4">Experience</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructorsList.length === 0 ? (
                    <tr><td colSpan="5" className="py-6 text-center opacity-60">No instructors stored in database yet.</td></tr>
                  ) : (
                    instructorsList.map((ins) => (
                      <tr key={ins._id} className="border-b border-dark-700/30">
                        <td className="py-3.5 px-4 font-bold">{ins.name}</td>
                        <td className="py-3.5 px-4">{Array.isArray(ins.specialization) ? ins.specialization.join(', ') : ins.specialization}</td>
                        <td className="py-3.5 px-4 opacity-80">{ins.experience || '5+ Years'}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                            ins.active !== false ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                          }`}>
                            {ins.active !== false ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 flex items-center gap-2">
                          <button
                            onClick={() => { setSelectedItem(ins); setFormData(ins); setModalType('editInstructor'); }}
                            className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteInstructor(ins._id)}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-gold-500">Gallery Management</h3>
                <p className="text-xs opacity-70">Upload and manage photo/video showcase items.</p>
              </div>
              <button
                onClick={() => {
                  setFormData({ title: '', category: 'Dance', mediaUrl: '', mediaType: 'image' });
                  setModalType('addGallery');
                }}
                className="px-4 py-2 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1 hover:bg-gold-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Gallery Item
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryList.length === 0 ? (
                <p className="col-span-full py-6 text-center opacity-60 text-xs">No gallery items uploaded yet.</p>
              ) : (
                galleryList.map((item) => (
                  <div key={item._id} className="relative group rounded-xl overflow-hidden border border-dark-700 bg-dark-800">
                    {item.mediaType === 'video' ? (
                      <video src={item.mediaUrl} controls className="w-full h-40 object-cover" />
                    ) : (
                      <img src={item.mediaUrl} alt={item.title} className="w-full h-40 object-cover" />
                    )}
                    <div className="p-3">
                      <p className="font-bold text-xs truncate">{item.title}</p>
                      <p className="text-[10px] text-gold-400 uppercase font-semibold">{item.category}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteGallery(item._id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}



        {/* 11. ENQUIRIES TAB */}
        {activeTab === 'queries' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-xl font-bold text-gold-500 mb-4">Visitor Enquiries</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-dark-700 text-gold-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Visitor Name</th>
                    <th className="py-3 px-4">Contact Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Message</th>
                    <th className="py-3 px-4">Date/Time</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {queriesList.length === 0 ? (
                    <tr><td colSpan="6" className="py-6 text-center opacity-60">No general enquiries recorded yet.</td></tr>
                  ) : (
                    queriesList.map((qry) => (
                      <tr key={qry._id} className="border-b border-dark-700/30">
                        <td className="py-3.5 px-4 font-bold">{qry.name}</td>
                        <td className="py-3.5 px-4 opacity-80">{qry.phone} • {qry.email}</td>
                        <td className="py-3.5 px-4 text-gold-400">{qry.category || 'General'}</td>
                        <td className="py-3.5 px-4 max-w-xs truncate">{qry.message}</td>
                        <td className="py-3.5 px-4 opacity-70 whitespace-nowrap">{qry.createdAt ? new Date(qry.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}</td>
                        <td className="py-3.5 px-4">
                          <select
                            value={qry.status || 'NEW'}
                            onChange={(e) => handleUpdateQueryStatus(qry._id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded border ${isDark ? 'bg-dark-800 border-dark-600 text-warm-50' : 'bg-warm-100 border-warm-300'}`}
                          >
                            <option value="NEW">NEW</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="RESOLVED">RESOLVED</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 12. ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-xl font-bold text-gold-500 mb-2">Studio Engagement Analytics</h3>
            <p className="text-xs opacity-70 mb-6">Real-time studio engagement metrics recorded across active visitor flows.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-dark-800 rounded-xl border border-dark-700">
                <p className="text-xs opacity-70">Total Enrollment Submissions</p>
                <p className="font-heading text-2xl font-bold text-gold-500 mt-1">{requestsList.length}</p>
              </div>
              <div className="p-4 bg-dark-800 rounded-xl border border-dark-700">
                <p className="text-xs opacity-70">Community Access Requests</p>
                <p className="font-heading text-2xl font-bold text-emerald-400 mt-1">{accessRequestsList.length}</p>
              </div>
              <div className="p-4 bg-dark-800 rounded-xl border border-dark-700">
                <p className="text-xs opacity-70">General Enquiries</p>
                <p className="font-heading text-2xl font-bold text-amber-400 mt-1">{queriesList.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* 13. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-xl font-bold text-gold-500 mb-2">Studio Settings</h3>
            <p className="text-xs opacity-70 mb-6">Configured studio contact info and system settings.</p>
            <div className="space-y-4 max-w-lg text-xs">
              <div>
                <label className="block opacity-70 mb-1">Studio Name</label>
                <input type="text" value="Geet Studio" readOnly className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50" />
              </div>
              <div>
                <label className="block opacity-70 mb-1">Contact Phone</label>
                <input type="text" value="8770409447" readOnly className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50" />
              </div>
              <div>
                <label className="block opacity-70 mb-1">Contact Email</label>
                <input type="text" value="geetdancestudio@gmail.com" readOnly className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50" />
              </div>
              <div>
                <label className="block opacity-70 mb-1">Location</label>
                <input type="text" value="Indore, Madhya Pradesh, India" readOnly className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50" />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CRUD MODAL */}
      {modalType && (
        <div className="fixed inset-0 z-[120] bg-black/70 flex items-center justify-center overflow-y-auto p-4">
          <div className={`relative max-w-lg w-full max-h-[calc(100vh-2rem)] overflow-y-auto p-6 rounded-2xl border shadow-2xl ${isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-white border-warm-200 text-dark-950'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-bold text-gold-500 capitalize">
                {modalType.replace(/([A-Z])/g, ' $1')}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 hover:bg-dark-800 rounded cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={
              modalType.includes('Class') ? handleSaveClass :
              modalType.includes('Event') ? handleSaveEvent :
              modalType.includes('Instructor') ? handleSaveInstructor :
              modalType.includes('Member') ? handleSaveMember :
              modalType.includes('Gallery') ? handleSaveGallery :
              handleSaveClass
            } className="space-y-4 text-xs">
              
              {(modalType.includes('Class') || modalType.includes('Event') || modalType.includes('Instructor') || modalType.includes('Member') || modalType.includes('Gallery')) && (
                <div>
                  <label className="block opacity-70 mb-1">Name / Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value, title: e.target.value })}
                    className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50"
                  />
                </div>
              )}

              {modalType.includes('Class') && (
                <>
                  <div>
                    <label className="block opacity-70 mb-1">Class Type</label>
                    <select
                      value={formData.type || 'class'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50"
                    >
                      <option value="class">Regular Class</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                  <div>
                    <label className="block opacity-70 mb-1">Timing</label>
                    <input
                      type="text"
                      value={formData.classTiming || ''}
                      onChange={(e) => setFormData({ ...formData, classTiming: e.target.value })}
                      className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50"
                    />
                  </div>
                  <div>
                    <label className="block opacity-70 mb-1">Fees (₹)</label>
                    <input
                      type="number"
                      value={formData.fees || 3000}
                      onChange={(e) => setFormData({ ...formData, fees: Number(e.target.value) })}
                      className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50"
                    />
                  </div>
                  <div>
                    <label className="block opacity-70 mb-1">Optional Thumbnail</label>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={formData.images?.[0]?.url || FALLBACK_THUMBNAIL}
                        alt="Selected thumbnail preview"
                        className="w-20 h-14 object-cover rounded border border-dark-700"
                      />
                      <div className="flex flex-wrap gap-2">
                        <label className="px-3 py-2 bg-dark-800 border border-dark-700 rounded cursor-pointer hover:border-gold-500">
                          {imageUploading ? 'Uploading...' : 'Upload Image'}
                          <input type="file" accept="image/*" onChange={(e) => handleThumbnailUpload(e, 'images')} disabled={imageUploading} className="hidden" />
                        </label>
                        {formData.images?.[0]?.url && (
                          <button type="button" onClick={handleRemoveThumbnail} className="px-3 py-2 border border-red-500/40 text-red-400 rounded cursor-pointer">
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <select
                      value={formData.images?.[0]?.url || ''}
                      onChange={(e) => setFormData({ ...formData, images: e.target.value ? [{ url: e.target.value }] : [] })}
                      className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50"
                    >
                      <option value="">Select an existing Studio Gallery image</option>
                      {galleryList.filter((item) => item.mediaType !== 'video').map((item) => (
                        <option key={item._id} value={item.mediaUrl}>{item.title}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {modalType.includes('Event') && (
                <>
                  <div>
                    <label className="block opacity-70 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50 h-20"
                    />
                  </div>
                  <div>
                    <label className="block opacity-70 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location || 'Geet Studio, Indore'}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50"
                    />
                  </div>
                </>
              )}

              {modalType.includes('Instructor') && (
                <div>
                  <label className="block opacity-70 mb-1">Optional Profile Image</label>
                  <div className="flex items-center gap-3">
                    <img
                      src={formData.profileImage?.url || FALLBACK_THUMBNAIL}
                      alt="Instructor preview"
                      className="w-16 h-16 object-cover rounded-full border border-dark-700"
                    />
                    <div className="flex flex-wrap gap-2">
                      <label className="px-3 py-2 bg-dark-800 border border-dark-700 rounded cursor-pointer hover:border-gold-500">
                        {imageUploading ? 'Uploading...' : 'Upload Image'}
                        <input type="file" accept="image/*" onChange={(e) => handleThumbnailUpload(e, 'profileImage')} disabled={imageUploading} className="hidden" />
                      </label>
                      {formData.profileImage?.url && (
                        <button type="button" onClick={() => handleRemoveThumbnail('profileImage')} className="px-3 py-2 border border-red-500/40 text-red-400 rounded cursor-pointer">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {modalType.includes('Gallery') && (
                <>
                  <div>
                    <label className="block opacity-70 mb-1">Upload media from device *</label>
                    <input
                      type="file"
                      required={!formData.mediaUrl}
                      accept="image/*,video/*"
                      onChange={handleGalleryUpload}
                      disabled={imageUploading}
                      className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50"
                    />
                    {formData.mediaUrl && (
                      formData.mediaType === 'video'
                        ? <video src={formData.mediaUrl} controls className="mt-3 w-full aspect-video object-contain bg-black" />
                        : <img src={formData.mediaUrl} alt="Gallery preview" className="mt-3 w-full aspect-video object-contain bg-black" />
                    )}
                  </div>
                  <div>
                    <label className="block opacity-70 mb-1">Category</label>
                    <select
                      value={formData.category || 'Dance'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50"
                    >
                      <option value="Dance">Dance</option>
                      <option value="Music">Music</option>
                      <option value="Fitness">Fitness</option>
                      <option value="Events">Events</option>
                      <option value="Workshops">Workshops</option>
                    </select>
                  </div>
                  <div>
                    <label className="block opacity-70 mb-1">Display Order (Order on Website)</label>
                    <input
                      type="number"
                      value={formData.displayOrder ?? 0}
                      onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                      className="w-full p-2.5 rounded border border-dark-700 bg-dark-800 text-warm-50"
                      placeholder="e.g. 1, 2, 3"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 border border-dark-700 text-xs font-semibold rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider rounded cursor-pointer hover:bg-gold-400"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
