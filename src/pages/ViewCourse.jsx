import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCourseProgressId,
} from '../slices/viewCourseSlice';
import ReviewModal from '../Components/core/ViewCourse/ReviewModal';
import VideoDetailsSidebar from '../Components/core/ViewCourse/VideoDetailsSidebar';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token);

        // Check if the response is valid
        if (
          courseData &&
          courseData.success &&
          courseData.data &&
          courseData.data.courseDetails &&
          Array.isArray(courseData.data.courseDetails.courseContent)
        ) {
          const { courseDetails, completedVideos, courseProgressId } = courseData.data;

          // Dispatch all data
          dispatch(setCourseSectionData(courseDetails.courseContent));
          dispatch(setEntireCourseData(courseDetails));
          dispatch(setCompletedLectures(completedVideos || []));
          dispatch(setCourseProgressId(courseProgressId || null));

          console.log("✅ Course Data Loaded");
          console.log("📦 courseProgressId:", courseProgressId);

          // Count total lectures
          let totalLectures = 0;
          courseDetails.courseContent.forEach((section) => {
            totalLectures += section?.subSection?.length || 0;
          });
          dispatch(setTotalNoOfLectures(totalLectures));
        } else {
          console.error("❌ Invalid course data structure:", courseData);
        }
      } catch (error) {
        console.error("❌ Error fetching full course details:", error);
      }
    };

    if (courseId && token) {
      fetchCourseDetails();
    }
  }, [courseId, token, dispatch]);

  return (
    <div className="flex w-screen">
      <div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
      </div>
      <div>
        <Outlet />
      </div>
      {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;
