import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from '../slices/viewCourseSlice';
import VideoDetailsSlidebar from '../components/core/ViewCourse/VideoDetailsSlidebar';
import { Outlet } from 'react-router-dom';
import ReviewModal from '../components/core/ViewCourse/ReviewModal';
import { useState } from 'react';

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false)
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecifics = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);

      console.log('Fetched courseData:', courseData);

      if (!courseData || !courseData.courseDetails) {
      //  console.error('❌ Course data is missing or incomplete');
        return;
      }

      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));

      let lectureCount = 0;
      courseData.courseDetails.courseContent.forEach((section) => {
        lectureCount += section?.subSection?.length || 0;
      });

      dispatch(setTotalNoOfLectures(lectureCount));
    };

    setCourseSpecifics();
  }, [courseId, token, dispatch]);

  return (
    <div className="flex w-full min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-[300px] border-r border-gray-800">
        <VideoDetailsSlidebar setReviewModal={setReviewModal} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
      {
            reviewModal && <ReviewModal setReviewModal={setReviewModal} />
      }
    </div>
  );
};

export default ViewCourse;

