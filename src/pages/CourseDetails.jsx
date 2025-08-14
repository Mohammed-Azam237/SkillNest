import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { FaShareSquare, FaChevronDown } from 'react-icons/fa';
import { IoVideocamOutline } from 'react-icons/io5';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { addToCart } from '../slices/cartSlice';
import { ACCOUNT_TYPE } from '../utils/constants';
import RatingStars from '../Components/common/RatingStars';
import GetAvgRating from '../utils/avgRating';

const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseDetail, setCourseDetail] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

  const handleAddToCart = () => {
    if (token) dispatch(addToCart(courseDetail));
    else navigate('/login');
  };

  const handlePayment = () => {
    if (token) {
       buyCourse(token, [courseId], user, navigate, dispatch);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const getCourseDetails = async () => {
      const response = await fetchCourseDetails(courseId, dispatch);
      setCourseDetail(response);
    };
    getCourseDetails();
  }, [courseId]);

  useEffect(() => {
    if (courseDetail?.ratingAndReviews?.length > 0) {
      const count = GetAvgRating(courseDetail.ratingAndReviews);
      setAvgReviewCount(count);
    }
  }, [courseDetail]);

  useEffect(() => {
    if (courseDetail) {
      const enrolled = courseDetail?.studentsEnrolled?.includes(user?._id);
      setAlreadyEnrolled(enrolled);
    }
  }, [courseDetail, user?._id]);

  if (!courseDetail)
    return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="w-full bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-900 text-white min-h-screen py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* HEADER + THUMBNAIL */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="col-span-2 space-y-6">
            <img
              src={courseDetail.thumbnail}
              alt="Course Thumbnail"
              className="w-full rounded-xl object-cover shadow-2xl max-h-[400px] hover:scale-[1.01] transition-transform"
            />
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold text-richblack-5 leading-tight">
                {courseDetail.courseName}
              </h1>
              <p className="text-richblack-300 text-lg">{courseDetail.courseDescription}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-50 font-bold text-lg">
                  {avgReviewCount.toFixed(1)}
                </span>
                <RatingStars Review_Count={avgReviewCount} />
              </div>
              <span className="text-richblack-200">
                ({courseDetail.ratingAndReviews.length} Reviews)
              </span>
              <span className="text-richblack-200">
                {courseDetail?.studentsEnrolled?.length} students enrolled
              </span>
            </div>
            <p className="text-richblack-300">
              Created by{' '}
              <span className="font-medium">
                {courseDetail.instructor.firstName} {courseDetail.instructor.lastName}
              </span>
            </p>
            <div className="flex items-center gap-6 text-richblack-300 text-sm">
              <div className="flex items-center gap-2">
                <AiOutlineInfoCircle />
                <span>
                  Created on{' '}
                  {new Date(courseDetail.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BsGlobe /> <span>English</span>
              </div>
            </div>

            <div className="bg-richblack-800 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-2 text-yellow-50">What you'll learn</h2>
              <p className="text-richblack-200 text-base leading-7">
                {courseDetail.whatYouWillLearn}
              </p>
            </div>

            {/* Course Content Accordion */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-richblack-5 mb-4">Course Content</h2>
              <p className="text-richblack-300">
                {courseDetail.courseContent.length} Sections |{' '}
                {courseDetail.courseContent.reduce(
                  (acc, item) => acc + item.subSection.length,
                  0
                )}{' '}
                Lectures
              </p>
              <div className="mt-4 space-y-4">
                {courseDetail.courseContent.map((item, index) => (
                  <details
                    key={index}
                    className="group bg-richblack-800 p-4 rounded-lg transition-all"
                  >
                    <summary className="flex justify-between items-center cursor-pointer text-lg font-medium">
                      <div className="flex items-center gap-2">
                        <FaChevronDown className="group-open:rotate-180 transition-transform" />
                        {item.sectionName}
                      </div>
                      <span className="text-yellow-100">
                        {item.subSection.length} Lectures
                      </span>
                    </summary>
                    <div className="mt-4 space-y-3">
                      {item.subSection.map((sub, idx) => (
                        <div
                          key={idx}
                          className="bg-richblack-900 p-4 rounded border border-richblack-700"
                        >
                          <div className="flex items-center gap-2">
                            <IoVideocamOutline />
                            <span>{sub.title}</span>
                          </div>
                          {sub.videoUrl ? (
                            <video controls className="mt-2 w-full rounded-lg">
                              <source src={sub.videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <p className="text-sm text-richblack-400">No video available</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-richblack-5 mb-4">Author</h2>
              <div className="flex items-center gap-4">
                <img
                  src={courseDetail.instructor.image}
                  alt="Author"
                  className="w-14 h-14 rounded-full object-cover border border-yellow-50"
                />
                <div>
                  <p className="text-lg font-semibold text-richblack-5">
                    {courseDetail.instructor.firstName} {courseDetail.instructor.lastName}
                  </p>
                  <p className="text-richblack-300 text-sm">
                    {courseDetail.instructor.additionalDetails?.about}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="sticky top-24 h-fit bg-richblack-800 rounded-xl p-6 shadow-xl space-y-4">
            <img
              src={courseDetail.thumbnail}
              alt="Preview"
              className="w-full rounded-lg object-cover h-[200px] shadow-md"
            />
            <div className="text-3xl font-bold text-yellow-50">₹{courseDetail.price}</div>
            {ACCOUNT_TYPE.INSTRUCTOR !== user?.accountType && (
              <>
                {alreadyEnrolled ? (
                  <button onClick={() => navigate("/dashboard/enrolled-courses")} className="yellowButton w-full">
                    Go to Course
                  </button>
                ) : (
                  <>
                    <button onClick={handlePayment} className="yellowButton w-full">
                      Buy Now
                    </button>
                    {cart?.some((item) => item._id === courseDetail._id) ? (
                      <button onClick={() => navigate("/dashboard/cart")} className="blackButton w-full mt-2">
                        Go to Cart
                      </button>
                    ) : (
                      <button onClick={handleAddToCart} className="blackButton w-full mt-2">
                        Add to Cart
                      </button>
                    )}
                  </>
                )}
              </>
            )}
            <p className="text-center text-xs text-richblack-300">30-Day Money-Back Guarantee</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied!");
              }}
              className="text-yellow-200 flex justify-center items-center gap-2 w-full"
            >
              <FaShareSquare /> Share
            </button>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-16 border-t border-richblack-700 pt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-richblack-5 mb-2">Student Reviews</h2>
              <p className="text-richblack-300">What learners are saying about this course</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-yellow-50 mb-1">
                {avgReviewCount.toFixed(1)}
              </div>
              <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
              <p className="text-sm text-richblack-300 mt-1">
                {courseDetail.ratingAndReviews.length} reviews
              </p>
            </div>
          </div>
          
          <div className="grid gap-6">
            {courseDetail.ratingAndReviews.map((review, idx) => (
              <div 
                key={idx} 
                className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 hover:border-yellow-50/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-50/5"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img 
                      src={review.user.image || `https://api.dicebear.com/5.x/initials/svg?seed=${review.user.firstName} ${review.user.lastName}`} 
                      alt="user" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-yellow-50/20" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-50 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-richblack-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-richblack-5 text-lg">
                          {review.user.firstName} {review.user.lastName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <RatingStars Review_Count={review.rating} Star_Size={16} />
                          <span className="text-sm text-yellow-50 font-medium">
                            {review.rating.toFixed(1)}/5
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-richblack-400">
                          {new Date().toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-richblack-700/50 rounded-lg p-4 border-l-4 border-yellow-50">
                      <p className="text-richblack-200 leading-relaxed italic">
                        "{review.review}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4 text-sm text-richblack-400">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Verified Student</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {courseDetail.ratingAndReviews.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-richblack-700 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-richblack-300 mb-2">No Reviews Yet</h3>
              <p className="text-richblack-400">Be the first to share your experience with this course!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;