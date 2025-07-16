import React from 'react';
import CatalogCard from './CatalogCard';

const CourseSlider = ({ Courses }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
        {Courses?.length > 0 ? (
          Courses.map((course, index) => (
            <div key={index} className="flex-shrink-0 w-[300px]">
              <CatalogCard course={course} Height={"h-[200px]"} />
            </div>
          ))
        ) : (
          <p className="text-white">No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default CourseSlider;
