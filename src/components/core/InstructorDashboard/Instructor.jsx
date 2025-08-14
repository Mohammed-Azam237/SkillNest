import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { getInstructorDashboard } from '../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import { InstructorChart } from "./InstructorChart"

const Instructor = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorDashboard(token, dispatch);
            const result = await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if (instructorApiData.length)
                setInstructorData(instructorApiData);

            if (result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    }, [token, dispatch])

    const totalAmount = instructorData?.reduce((acc, course) => acc + course.totalRevenue, 0);
    const totalStudents = instructorData?.reduce((acc, course) => acc + course.totalStudents, 0);

    return (
        <div className="min-h-screen bg-richblack-900 text-white p-6">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                    Hi {user?.firstName} 👋
                </h1>
                <p className="text-richblack-300 text-lg">
                    Let's start something new today
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-50"></div>
                </div>
            ) : courses.length > 0 ? (
                <div className="space-y-8">
                    {/* Statistics and Chart Section */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Chart Section */}
                        <div className="lg:col-span-2 bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                            <h2 className="text-2xl font-semibold mb-4 text-white">Course Performance</h2>
                            <InstructorChart courses={instructorData} />
                        </div>

                        {/* Statistics Cards */}
                        <div className="space-y-4">
                            <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-richblack-700 rounded-lg p-4">
                                        <p className="text-richblack-300 text-sm">Total Courses</p>
                                        <p className="text-2xl font-bold text-yellow-50">{courses.length}</p>
                                    </div>
                                    
                                    <div className="bg-richblack-700 rounded-lg p-4">
                                        <p className="text-richblack-300 text-sm">Total Students</p>
                                        <p className="text-2xl font-bold text-yellow-50">{totalStudents}</p>
                                    </div>
                                    
                                    <div className="bg-richblack-700 rounded-lg p-4">
                                        <p className="text-richblack-300 text-sm">Total Revenue</p>
                                        <p className="text-2xl font-bold text-yellow-50">₹{totalAmount?.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Courses Section */}
                    <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-white">Your Courses</h2>
                            <Link 
                                to="/dashboard/my-courses"
                                className="text-yellow-50 hover:text-yellow-200 transition-colors duration-200 font-medium"
                            >
                                View All →
                            </Link>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.slice(0, 3).map((course, index) => (
                                <div 
                                    key={course._id || index}
                                    className="bg-richblack-700 rounded-lg overflow-hidden border border-richblack-600 hover:border-yellow-50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-50/10"
                                >
                                    <div className="relative">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseName}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-2 right-2 bg-richblack-900/80 text-white px-2 py-1 rounded text-sm">
                                            ₹{course.price}
                                        </div>
                                    </div>
                                    
                                    <div className="p-4">
                                        <h3 className="font-semibold text-white mb-2 line-clamp-2">
                                            {course.courseName}
                                        </h3>
                                        
                                        <div className="flex items-center justify-between text-sm text-richblack-300">
                                            <div className="flex items-center space-x-2">
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {course.studentEnrolled?.length || 0} students
                                                </span>
                                            </div>
                                            <span className="text-yellow-50 font-medium">
                                                ₹{course.price}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                        <div className="mb-6">
                            <svg className="w-24 h-24 mx-auto text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            No Courses Yet
                        </h3>
                        <p className="text-richblack-300 mb-8">
                            You haven't created any courses yet. Start your teaching journey by creating your first course!
                        </p>
                        <Link 
                            to="/dashboard/addCourse"
                            className="inline-flex items-center px-6 py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create Your First Course
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Instructor
