import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { FaUser, FaEnvelope, FaVenusMars, FaPhone, FaBirthdayCake, FaInfoCircle, FaEdit } from 'react-icons/fa'

const bannerUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 overflow-hidden">
            {/* Banner Section */}
            <div className="relative w-full h-56 md:h-64 lg:h-72 flex items-end justify-center">
                <img
                    src={bannerUrl}
                    alt="Profile Banner"
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/90 via-richblack-900/60 to-transparent z-10" />
                <div className="absolute -bottom-16 md:-bottom-20 z-20 flex flex-col items-center w-full">
                    {/* Animated Avatar Border */}
                    <div className="relative group">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-200 to-yellow-400 animate-spin-slow blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300" style={{ filter: 'blur(8px)' }}></div>
                        <div className="relative rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-yellow-200 to-yellow-400">
                            <img
                                src={user?.image}
                                alt={`profile-${user?.firstName}`}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover bg-richblack-700 shadow-2xl border-4 border-richblack-900"
                            />
                        </div>
                        <span className="absolute bottom-2 right-2 bg-yellow-400 text-richblack-900 text-xs font-bold px-2 py-1 rounded-full shadow-md z-30">You</span>
                    </div>
                </div>
            </div>

            {/* Main Content Fade-in */}
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center pt-32 md:pt-36 animate-fadeIn">
                {/* Header Section */}
                <div className="w-full flex flex-col items-center md:items-start text-center md:text-left mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-50 mb-2 tracking-tight drop-shadow-lg">
                        {user?.firstName + " " + user?.lastName}
                    </h1>
                    <p className="text-richblack-200 text-lg font-medium flex items-center justify-center md:justify-start gap-2 mb-2">
                        <FaEnvelope className="inline-block text-yellow-200" />
                        {user?.email}
                    </p>
                    <IconBtn
                        text="Edit Profile"
                        icon={<FaEdit className="text-lg" />}
                        className="hover:scale-105 hover:bg-yellow-50/10 transition-all duration-200 mt-2"
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    />
                </div>

                {/* About Section */}
                <div className="w-full mb-8">
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-yellow-50/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <FaInfoCircle className="text-yellow-200 text-lg" />
                                <p className="text-xl font-semibold text-richblack-5">About</p>
                            </div>
                            <IconBtn text="Edit" icon={<FaEdit />} className="hover:scale-105 hover:bg-yellow-50/10 transition-all duration-200" onclick={() => navigate("/dashboard/settings")} />
                        </div>
                        <p className="text-richblack-200 text-lg font-medium italic min-h-[32px]">
                            {user?.additionalDetails?.about ?? "Write something about yourself"}
                        </p>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="w-full mb-20">
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-yellow-50/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <FaUser className="text-yellow-200 text-lg" />
                                <p className="text-xl font-semibold text-richblack-5">Personal Information</p>
                            </div>
                            <IconBtn text="Edit" icon={<FaEdit />} className="hover:scale-105 hover:bg-yellow-50/10 transition-all duration-200" onclick={() => navigate("/dashboard/settings")} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-yellow-300" />
                                    <div>
                                        <p className="mb-1 text-sm text-richblack-100">First Name</p>
                                        <p className="text-lg font-bold text-richblack-5">{user?.firstName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-yellow-300" />
                                    <div>
                                        <p className="mb-1 text-sm text-richblack-100">Email</p>
                                        <p className="text-lg font-bold text-richblack-5 break-words">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaVenusMars className="text-yellow-300" />
                                    <div>
                                        <p className="mb-1 text-sm text-richblack-100">Gender</p>
                                        <p className="text-lg font-bold text-richblack-5">{user?.additionalDetails?.gender ?? "Add gender"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-yellow-300" />
                                    <div>
                                        <p className="mb-1 text-sm text-richblack-100">Last Name</p>
                                        <p className="text-lg font-bold text-richblack-5">{user?.lastName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaPhone className="text-yellow-300" />
                                    <div>
                                        <p className="mb-1 text-sm text-richblack-100">Phone Number</p>
                                        <p className="text-lg font-bold text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add contact number"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaBirthdayCake className="text-yellow-300" />
                                    <div>
                                        <p className="mb-1 text-sm text-richblack-100">Date of Birth</p>
                                        <p className="text-lg font-bold text-richblack-5">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
