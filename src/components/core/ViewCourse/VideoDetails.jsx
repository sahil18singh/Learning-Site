import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ControlBar,
  Player,
  BigPlayButton,
  LoadingSpinner,
  PlaybackRateMenuButton,
  ForwardControl,
  ReplayControl,
  CurrentTimeDisplay,
  TimeDivider,
} from 'video-react';
import { BiSkipPreviousCircle, BiSkipNextCircle } from 'react-icons/bi';
import { MdOutlineReplayCircleFilled } from 'react-icons/md';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { setCompletedLectures } from '../../../slices/viewCourseSlice';

const VideoDetails = () => {
  const { courseId, sectionId, subsectionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playerRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const {
    courseSectionData,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [videoEnd, setVideoEnd] = useState(false);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const section = courseSectionData.find((sec) => sec._id === sectionId);
    const subsection = section?.subSection?.find((sub) => sub._id === subsectionId);

    setVideoData(subsection);
    setVideoEnd(false);
  }, [courseSectionData, sectionId, subsectionId]);

  const isFirstLecture = () => {
    const sectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex((sub) => sub._id === subsectionId);
    return sectionIndex === 0 && subIndex === 0;
  };

  const isLastLecture = () => {
    const sectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex((sub) => sub._id === subsectionId);
    return (
      sectionIndex === courseSectionData.length - 1 &&
      subIndex === courseSectionData[sectionIndex]?.subSection.length - 1
    );
  };

  const nextLecture = () => {
    const sectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex((sub) => sub._id === subsectionId);

    if (subIndex === courseSectionData[sectionIndex]?.subSection.length - 1) {
      const nextSection = courseSectionData[sectionIndex + 1];
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`);
    } else {
      const nextSub = courseSectionData[sectionIndex].subSection[subIndex + 1];
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/sub-section/${nextSub._id}`);
    }
  };

  const previousLecture = () => {
    const sectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex((sub) => sub._id === subsectionId);

    if (subIndex === 0) {
      const prevSection = courseSectionData[sectionIndex - 1];
      const lastSub = prevSection.subSection[prevSection.subSection.length - 1];
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastSub._id}`);
    } else {
      const prevSub = courseSectionData[sectionIndex].subSection[subIndex - 1];
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/sub-section/${prevSub._id}`);
    }
  };

  const handleLectureCompletion = async () => {
    await markLectureAsComplete({
      userId: user._id,
      courseId,
      subSectionId: subsectionId,
    }, token);

    dispatch(setCompletedLectures([...completedLectures, videoData._id]));
    setVideoEnd(false);
  };

  return (
    <div className="md:w-[calc(100vw-320px)] w-screen p-4 bg-richblack-900 text-white min-h-screen">
      {!videoData ? (
        <h1 className="text-center text-xl font-semibold text-richblack-100">Loading...</h1>
      ) : (
        <div className="rounded-lg overflow-hidden shadow-md border border-richblack-700">
          <Player
            className="w-full relative"
            ref={playerRef}
            src={videoData.videoUrl}
            aspectRatio="16:9"
            fluid={true}
            autoPlay={false}
            onEnded={() => setVideoEnd(true)}
          >
            <BigPlayButton position="center" />
            <LoadingSpinner />
            <ControlBar>
              <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
              <ReplayControl seconds={5} order={7.1} />
              <ForwardControl seconds={5} order={7.2} />
              <TimeDivider order={4.2} />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
            </ControlBar>

            {videoEnd && (
              <div className="absolute inset-0 flex items-center justify-center gap-8 z-20">
                {!isFirstLecture() && (
                  <BiSkipPreviousCircle
                    onClick={previousLecture}
                    className="text-5xl text-yellow-100 bg-richblack-700 p-1 rounded-full cursor-pointer hover:scale-110 transition"
                  />
                )}

                <MdOutlineReplayCircleFilled
                  onClick={() => {
                    playerRef.current.seek(0);
                    playerRef.current.play();
                    setVideoEnd(false);
                  }}
                  className="text-6xl text-yellow-100 bg-richblack-700 p-1 rounded-full cursor-pointer hover:scale-110 transition"
                />

                {!isLastLecture() && (
                  <BiSkipNextCircle
                    onClick={nextLecture}
                    className="text-5xl text-yellow-100 bg-richblack-700 p-1 rounded-full cursor-pointer hover:scale-110 transition"
                  />
                )}

                {!completedLectures.includes(videoData._id) && (
                  <button
                    onClick={handleLectureCompletion}
                    className="absolute top-[20%] px-5 py-2 bg-yellow-100 text-richblack-900 font-semibold rounded-md shadow hover:scale-95 transition"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            )}
          </Player>
        </div>
      )}

      <div className="mt-6 bg-richblack-800 p-5 rounded-md shadow-sm border border-richblack-700">
        <h1 className="text-2xl font-bold text-yellow-100 mb-2">{videoData?.title}</h1>
        <p className="text-richblack-200 leading-relaxed">{videoData?.description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
