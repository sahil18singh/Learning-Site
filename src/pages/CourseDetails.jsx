import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../utils/constant';

const CourseDetails = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const [courseDetail, setCourseDetail] = useState(null);
    const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

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
            console.log("res  ",response)
        };
        getCourseDetails();
    }, [courseId, dispatch]);

    useEffect(() => {
        if (courseDetail) {
            const enrolled = courseDetail?.studentsEnrolled?.find((student) => student === user?._id);
            if (enrolled) {
                setAlreadyEnrolled(true);
            }
        }
    }, [courseDetail, user?._id]);

    if (!courseDetail) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='text-richblack-5'>Loading...</div>
            </div>
        );
    }

    return (
        <div className='p-6 bg-richblack-900 text-richblack-5'>
            {/* Course Header Section */}
            <div className='flex flex-col lg:flex-row gap-6'>
                <div className='lg:w-2/3'>
                    <div className='mt-4'>
                        <h1 className='text-3xl font-bold'>{courseDetail?.courseName}</h1>
                        <p className='text-richblack-200 mt-2'>{courseDetail?.courseDescription}</p>
                        <p className='mt-2'>
                            Created By {courseDetail?.instructor?.firstName} {courseDetail?.instructor?.lastName}
                        </p>
                        <p className='text-richblack-200'>
                            Created at {new Date(courseDetail?.createdAt || courseDetail?.updatedAt).toLocaleDateString('en-US')}
                        </p>
                        <p className='text-richblack-200'>Language: English</p>
                    </div>
                </div>

                {/* Course Actions Section */}
                <div className='lg:w-1/3 bg-richblack-800 p-6 rounded-lg'>
                    <img
                        src={courseDetail?.thumbnail}
                        alt="Course Thumbnail"
                        className='w-full h-32 object-cover rounded-lg'
                    />
                    <p className='text-2xl font-bold mt-4'>₹{courseDetail?.price}</p>
                    {ACCOUNT_TYPE.INSTRUCTOR !== user?.accountType && (
                        <>
                            {alreadyEnrolled ? (
                                <button
                                    onClick={() => navigate('/dashboard/enrolled-courses')}
                                    className='w-full bg-yellow-50 text-richblack-900 py-2 rounded-lg mt-4'
                                >
                                    Go to Course
                                </button>
                            ) : (
                                <button
                                    onClick={handlePayment}
                                    className='w-full bg-yellow-50 text-richblack-900 py-2 rounded-lg mt-4'
                                >
                                    Buy Now
                                </button>
                            )}
                        </>
                    )}
                    <p className='text-richblack-200 mt-4'>30-Day Money-Back Guarantee</p>
                    <p className='text-richblack-200 mt-4'>This course includes:</p>
                    <div className='mt-2'>
                        {courseDetail?.instructions && JSON.parse(courseDetail.instructions).map((item, index) => (
                            <div key={index} className='flex items-center gap-2'>
                                <span>✓</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success('URL copied to clipboard');
                        }}
                        className='w-full bg-richblack-700 text-richblack-5 py-2 rounded-lg mt-4'
                    >
                        Share
                    </button>
                </div>
            </div>

            {/* What You'll Learn Section */}
            <div className='mt-8'>
                <h2 className='text-2xl font-bold'>What you'll learn</h2>
                <div className='text-richblack-200 mt-2'>{courseDetail?.whatYouWillLearn}</div>
            </div>

            {/* Course Content Section */}
            <div className='mt-8'>
                <h2 className='text-2xl font-bold'>Course Content</h2>
                <div className='text-richblack-200 mt-2'>
                    <span>{courseDetail?.courseContent?.length} Section(s)</span>
                    <span className='ml-4'>
                        {courseDetail?.courseContent?.reduce((acc, item) => acc + item?.subSection?.length, 0)} Lecture(s)
                    </span>
                </div>
                {courseDetail?.courseContent?.map((item, index) => (
                    <details key={index} className='mt-4'>
                        <summary className='flex justify-between items-center cursor-pointer'>
                            <span>{item?.sectionName}</span>
                            <span>{item?.subSection?.length} Lecture(s)</span>
                        </summary>
                        <div className='mt-2'>
                            {item?.subSection?.map((subItem, subIndex) => (
                                <div key={subIndex} className='text-richblack-200'>
                                    <span>{subItem?.title}</span>
                                </div>
                            ))}
                        </div>
                    </details>
                ))}
            </div>

            {/* Author Section */}
            <div className='mt-8'>
                <h2 className='text-2xl font-bold'>Author</h2>
                <div className='flex items-center gap-4 mt-4'>
                    <img
                        src={courseDetail?.instructor?.image}
                        alt="Author"
                        className='w-16 h-16 rounded-full'
                    />
                    <div>
                        <p className='text-xl font-bold'>
                            {courseDetail?.instructor?.firstName} {courseDetail?.instructor?.lastName}
                        </p>
                        <p className='text-richblack-200'>{courseDetail?.instructor?.additionalDetails?.about}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
