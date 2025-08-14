import React, { useState, useEffect } from 'react'
import ReactStars from "react-stars"
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'
import { FaStar } from "react-icons/fa"

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]); 

    useEffect(() => {
        const fetchAllReviews = async () => {
            const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("Reviews API Response:", data);

            if (data?.success) {
                setReviews(data?.data)
            }
        }
        fetchAllReviews();
    }, []);

    useEffect(() => {
        console.log("✅ Updated reviews:", reviews);
    }, [reviews]);
    
    return (
        <div className='text-white'>
            <div className='max-w-maxContent mx-auto'>
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-richblack-5 mb-3 bg-gradient-to-r from-yellow-50 to-yellow-200 bg-clip-text text-transparent">
                        What Our Students Say
                    </h2>
                    <p className="text-richblack-300 text-lg">Real feedback from learners around the world</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div 
                            key={index}
                            className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-6 border border-yellow-50/20 hover:border-yellow-50/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-50/10 transform"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header with better styling */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <img
                                            src={review?.user?.image 
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                            className='w-14 h-14 object-cover rounded-full border-3 border-yellow-50/30 shadow-lg'
                                            alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                                            <svg className="w-3 h-3 text-richblack-900" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-richblack-5 text-lg">
                                            {review?.user?.firstName} {review?.user?.lastName}
                                        </h3>
                                        <p className="text-sm text-yellow-50/80 font-medium">
                                            {review?.course?.courseName}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating with better styling */}
                                <div className="flex items-center gap-3 mb-4">
                                    <ReactStars 
                                        count={5}
                                        value={review.rating}
                                        size={20}
                                        edit={false}
                                        activeColor="#fbbf24"
                                        emptyIcon={<FaStar/>}
                                        fullIcon={<FaStar/>}
                                    />
                                    <span className="text-lg text-yellow-50 font-bold">
                                        {review?.rating.toFixed(1)}
                                    </span>
                                </div>

                                {/* Review Text with better styling */}
                                <div className="flex-1">
                                    <div className="bg-gradient-to-r from-richblack-700/60 to-richblack-600/60 rounded-xl p-5 border-l-4 border-yellow-50 shadow-inner">
                                        <p className="text-richblack-100 text-base leading-relaxed italic font-medium">
                                            "{review?.review?.length > 120 
                                                ? `${review?.review.substring(0, 120)}...` 
                                                : review?.review}"
                                        </p>
                                    </div>
                                </div>

                                {/* Footer with better styling */}
                                <div className="mt-6 pt-4 border-t border-yellow-50/20">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-yellow-50/70">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-medium">Verified Student</span>
                                        </div>
                                        <div className="text-xs text-richblack-400">
                                            ⭐ Excellent Review
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {reviews.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-richblack-700 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-richblack-300 mb-3">No Reviews Yet</h3>
                        <p className="text-richblack-400 text-lg">Be the first to share your experience!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReviewSlider
