import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateAdditionalDetails, updatePassword, updatePfp, deleteAccount } from '../../../services/operations/profileAPI'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaVenusMars, FaPhone, FaBirthdayCake, FaInfoCircle, FaEdit, FaImage, FaTransgender, FaPhoneAlt, FaRegAddressCard, FaRegIdBadge } from 'react-icons/fa'

const bannerUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.profile.user);
  // update profile picture
  const pfp = useSelector(state => state.profile.user.image);
  const [profilePicture, setprofilePicture] = useState(pfp)
  const token = useSelector(state => state.auth.token);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    updatePfp(token, file);
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setprofilePicture(URL.createObjectURL(file));
  }

  // update additional info
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    about: "",
  })
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  const handelAdditionalDetails = (e) => {
    e.preventDefault()
    updateAdditionalDetails(token, formData);
  }

  // update password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const handleOnChangePassword = (e) => {
    setPassword((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  const handlePassword = (e) => {
    e.preventDefault()
    const { newPassword, confirmPassword } = password;
    if (newPassword === confirmPassword) {
      updatePassword(token, password);
    } else {
      alert("Password does not match")
    }
  }

  // delete account
  const onDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteAccount(token, dispatch, navigate);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 overflow-hidden">
      {/* Banner Section */}
      <div className="relative w-full h-56 md:h-64 lg:h-72 flex items-end justify-center">
        <img
          src={bannerUrl}
          alt="Settings Banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/90 via-richblack-900/60 to-transparent z-10" />
        <div className="absolute -bottom-16 md:-bottom-20 z-20 flex flex-col items-center w-full">
          {/* Animated Avatar Border */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-200 to-yellow-400 animate-spin-slow blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300" style={{ filter: 'blur(8px)' }}></div>
            <div className="relative rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-yellow-200 to-yellow-400">
              <img
                src={profilePicture}
                alt={`profile-${user?.firstName}`}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover bg-richblack-700 shadow-2xl border-4 border-richblack-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Fade-in */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center pt-32 md:pt-36 animate-fadeIn">
        {/* Profile Picture Update */}
        <div className="w-full mb-10">
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-yellow-50/10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-6 flex-1">
              <div className="relative">
                <img className="w-24 h-24 rounded-full object-cover border-4 border-yellow-50 shadow-lg" src={profilePicture} alt="Profile" />
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-richblack-900 text-xs font-bold px-2 py-1 rounded-full shadow-md">You</div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-richblack-5 flex items-center gap-2"><FaImage className="text-yellow-200" /> Change Profile Picture</p>
                <form onSubmit={handleUpload} className="flex flex-col gap-2 md:flex-row md:items-center">
                  <label className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 flex items-center gap-2" htmlFor="upload">
                    <FaImage className="text-yellow-200" /> Select
                    <input id='upload' type="file" onChange={handleFileChange} className="hidden" accept="image/png, image/gif, image/jpeg " name='pfp' />
                  </label>
                  <button type='submit' className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200'><FaEdit /> Upload</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Update Additional Info */}
        <form onSubmit={handelAdditionalDetails} className="w-full mb-10">
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-yellow-50/10">
            <h2 className="text-2xl font-bold text-yellow-50 flex items-center gap-2 mb-6"><FaRegAddressCard className="text-yellow-200" /> Profile Information</h2>
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="firstName" className="text-richblack-50 flex items-center gap-2"><FaUser className="text-yellow-300" /> First Name</label>
                <input defaultValue={user.firstName || null} type="text" name="firstName" id="firstName" placeholder="Enter first name" className="form-style" onChange={handleOnChange} />
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastName" className="text-richblack-50 flex items-center gap-2"><FaUser className="text-yellow-300" /> Last Name</label>
                <input defaultValue={user.lastName || null} type="text" name="lastName" id="lastName" placeholder="Enter last name" className="form-style" onChange={handleOnChange} />
              </div>
            </div>
            <div className="flex flex-col gap-5 lg:flex-row mt-4">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="dateOfBirth" className="text-richblack-50 flex items-center gap-2"><FaBirthdayCake className="text-yellow-300" /> Date of Birth</label>
                <input defaultValue={user?.additionalDetails.dateOfBirth || null} type="date" name="dateOfBirth" id="dateOfBirth" className="form-style" onChange={handleOnChange} />
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="gender" className="text-richblack-50 flex items-center gap-2"><FaTransgender className="text-yellow-300" /> Gender</label>
                <select defaultValue={user?.additionalDetails.gender || null} type="text" name="gender" id="gender" className="form-style" onChange={handleOnChange}>
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-5 lg:flex-row mt-4">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="contactNumber" className="text-richblack-50 flex items-center gap-2"><FaPhoneAlt className="text-yellow-300" /> Contact Number</label>
                <input defaultValue={user?.additionalDetails.contactNumber || null} type="tel" name="contactNumber" id="contactNumber" placeholder="Enter Contact Number" className="form-style" onChange={handleOnChange} />
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="about" className="text-richblack-50 flex items-center gap-2"><FaInfoCircle className="text-yellow-300" /> About</label>
                <input defaultValue={user?.additionalDetails.about || null} type="text" name="about" id="about" placeholder="Enter Bio Details" className="form-style" onChange={handleOnChange} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6"><button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200" type="submit"><FaEdit /> Save</button></div>
          </div>
        </form>

        {/* Update Password */}
        <form onSubmit={handlePassword} className="w-full mb-10">
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-yellow-50/10">
            <h2 className="text-2xl font-bold text-yellow-50 flex items-center gap-2 mb-6"><FaRegIdBadge className="text-yellow-200" /> Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className='relative'>
                <label className="w-full flex items-center gap-2"><FaRegIdBadge className="text-yellow-300" /><span>Old Password <sup className="text-pink-200">*</sup></span></label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  value={password.oldPassword}
                  onChange={handleOnChangePassword}
                  placeholder="Enter Password"
                  style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 mt-2"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-10 z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                  )}
                </span>
              </div>
              <div className='relative'>
                <label className="w-full flex items-center gap-2"><FaRegIdBadge className="text-yellow-300" /><span>New Password <sup className="text-pink-200">*</sup></span></label>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handleOnChangePassword}
                  placeholder="Enter Password"
                  style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 mt-2"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-10 z-[10] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                  )}
                </span>
              </div>
              <div className='relative col-span-1 md:col-span-2'>
                <label className="w-full flex items-center gap-2"><FaRegIdBadge className="text-yellow-300" /><span>Confirm New Password <sup className="text-pink-200">*</sup></span></label>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handleOnChangePassword}
                  placeholder="Enter Password"
                  style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 mt-2"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-10 z-[10] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6"><button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200" type="submit"><FaEdit /> Save</button></div>
          </div>
        </form>

        {/* Delete Account */}
        <div className="w-full mb-20">
          <div className="relative bg-gradient-to-br from-pink-900/80 to-pink-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-pink-300/20 flex flex-row gap-x-8 items-center">
            <div className="flex aspect-square h-16 w-16 items-center justify-center rounded-full bg-pink-700 shadow-lg">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-4xl text-pink-200" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <h2 className="text-2xl font-bold text-pink-100 flex items-center gap-2"><FaRegIdBadge className="text-pink-200" /> Delete Account</h2>
              <div className="md:w-3/5 text-pink-50 text-base"><p>Would you like to delete your account?</p>
                <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the content associated with it.</p>
              </div>
              <button type="button" onClick={onDeleteAccount} className="w-fit cursor-pointer italic text-pink-200 hover:text-pink-100 font-semibold underline underline-offset-2 transition-all duration-200">I want to delete my account.</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings