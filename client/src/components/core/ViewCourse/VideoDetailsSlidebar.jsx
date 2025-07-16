import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaAngleDoubleRight, FaChevronLeft } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import IconBtn from "../../../common/IconBtn";

const VideoDetailsSlidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoActive, setVideoActive] = useState("");
  const { courseId, sectionId, subsectionId } = useParams();
  const { courseSectionData, completedLectures, totalNoOfLectures } = useSelector(
    (state) => state.viewCourse
  );
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    (() => {
      if (!courseSectionData) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );
      const currentSubSectionIndex =
        courseSectionData[currentSectionIndex]?.subSection.findIndex(
          (subSection) => subSection?._id === subsectionId
        );
      if (currentSectionIndex === -1 || currentSubSectionIndex === -1) return;
      const activesubsectionId =
        courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex]._id;
      setActiveStatus(courseSectionData[currentSectionIndex]._id);
      setVideoActive(activesubsectionId);
    })();
  }, [courseSectionData, sectionId, subsectionId]);

  return (
    <>
      {/* Toggle Button (Mobile) */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed left-4 top-4 z-50 bg-richblack-700 p-2 rounded-full text-white shadow-lg md:hidden"
        >
          <FaAngleDoubleRight className="text-xl" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`h-full flex flex-col border-r border-richblack-700 transition-all duration-300 ${
          showSidebar ? "w-[320px]" : "w-0"
        } bg-richblack-800 text-richblack-5 fixed md:relative z-40`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-richblack-700">
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                window.innerWidth < 768
                  ? setShowSidebar(false)
                  : navigate("/dashboard/enrolled-courses")
              }
              className="text-richblack-200 hover:text-white transition-colors"
            >
              <FaChevronLeft className="text-lg" />
            </button>
            
            <h2 className="text-xl font-semibold">Course Content</h2>
            <IconBtn text={"Review"} onclick={()=>{setReviewModal(true)}}/>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-4 border-b border-richblack-700">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-yellow-50">
              {completedLectures?.length} of {totalNoOfLectures} completed
            </span>
            <span className="text-richblack-300">
              {Math.round((completedLectures?.length / totalNoOfLectures) * 100)}%
            </span>
          </div>
          <div className="w-full bg-richblack-600 rounded-full h-2">
            <div
              className="bg-yellow-50 h-2 rounded-full"
              style={{
                width: `${(completedLectures?.length / totalNoOfLectures) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {courseSectionData?.map((section, index) => (
            <div
              key={index}
              className={`mb-2 mx-2 rounded-lg overflow-hidden ${
                activeStatus === section._id ? "bg-richblack-700" : "bg-richblack-800"
              }`}
            >
              <button
                className="w-full flex justify-between items-center p-3 hover:bg-richblack-600 transition-colors"
                onClick={() =>
                  setActiveStatus((prev) => (prev === section._id ? "" : section._id))
                }
              >
                <h3 className="font-medium text-left">{section?.sectionName}</h3>
                <MdOutlineKeyboardArrowDown
                  className={`transition-transform ${
                    activeStatus === section._id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeStatus === section._id && (
                <div className="px-2 pb-2 space-y-1">
                  {section?.subSection.map((subSection) => (
                    <button
                      key={subSection?._id}
                      className={`w-full text-left flex items-center gap-3 p-2 rounded-md ${
                        videoActive === subSection._id
                          ? "bg-yellow-50 text-richblack-900 font-medium"
                          : "hover:bg-richblack-600 text-richblack-100"
                      } transition-colors`}
                      onClick={() => {
                        if (window.innerWidth < 768) setShowSidebar(false);
                        navigate(
                          `/dashboard/enrolled-courses/view-course/${courseId}/section/${section._id}/sub-section/${subSection._id}`
                        );
                      }}
                    >
                      <div
                        className={`w-4 h-4 rounded-sm border ${
                          completedLectures?.includes(subSection?._id)
                            ? "bg-yellow-50 border-yellow-50"
                            : "border-richblack-300"
                        } flex items-center justify-center`}
                      >
                        {completedLectures?.includes(subSection?._id) && (
                          <span className="text-xs text-richblack-900">✓</span>
                        )}
                      </div>
                      <span className="truncate">{subSection?.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSlidebar;
