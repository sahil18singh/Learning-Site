import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import Browse from '../../../../../assets/browse.jpg'


const Upload = ({name,label,register,errors,setValue}) => {
    const [image,setImage] = useState(null);
    const {editCourse,course} = useSelector((state)=>state.course);

    const handleOnChange = (e)=>{
        const file = e.target.files[0];
        setValue(name,file);

        if(file){
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
        else{
            console.log("No File Selected");
        }
    };

    useEffect(()=>{
        if(editCourse){
            setImage(course?.thumbnail);
        }
    },[])
  return (
    <div>
       
      {image?(
        <div className='flex flex-col space-y-2'>
            <img src={image} alt="COurse Thumbnail" className='h-full w-full rounded-md object-cover' />
            <button type="button" onClick={()=>{
                setImage(null)
                setValue(name,null) } } className="text-sm text-richblack-5"
            >Remove</button>
        </div>
      ):(
        <div className='flex flex-col space-y-2'>
            <label htmlFor={name} className="text-sm text-richblack-5">
                <div>
                Course Thumbnail <sup className="text-pink-200">*</sup>
                </div>

                <div className="bg-richblack-700 flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500">
                <div className="flex w-full flex-col items-center p-6" role="presentation" tabIndex={0}>
                    <input
                    id={name}
                    name={name}
                    type='file'
                    accept="image/*,.jpeg,.jpg,.png"
                    {...register(name, { required: true })}
                    onChange={handleOnChange}
                    className="hidden"
                    />
                    {/* Replace SVG with an image */}
                    <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                    <img src={Browse} alt="Upload Icon" className="w-14 h-14" />
                    </div>
                    <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                    Drag and drop an image, or click to{" "}
                    <span className="font-semibold text-yellow-50">Browse</span> a file
                    </p>
                   
                    
                </div>
                </div>
                </label>
                {errors.courseImage && (
                         <span className="ml-2 text-xs tracking-wide text-pink-200">Course Image is required**</span>
                )}
              
        </div>
      )}
    </div>
  )
}

export default Upload
