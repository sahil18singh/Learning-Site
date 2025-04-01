const Category = require('../models/Category');

const Course = require("../models/Course");

//create Category ka handler function

exports.createCategory = async (req,res) =>{
    try{
        //fetch data
        const {name,description} = req.body;

        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }

        //create entry in DB
        const CategoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(CategoryDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

//getAlltags handler function

exports.showAllCategories = async (req,res)=>{
    try{
        const allCategorys = await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:'All categories returned successfully',
            data:allCategorys,
        //    allTags,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

exports.categoryPageDetails = async(req,res)=>{
    try{
        const {categoryId} = req.body;

        const selectedCategory = await Category.findById(categoryId)
            .populate({path:"course",match:{satus:"Published"},populate:([{path:"instructor"},{path:"ratingAndReviews"}])})
            .exec();

        if(!selectedCategory){
            console.log("Category not found");
            return res.status(404).json({
                success:false,
                message:"Category not found",
            });
        }    

        if(selectedCategory.course.length === 0){
            console.log("No course found for the selected category");
            return res.status(404).json({
                success:false,
                message:"No course found for the selected category",
            });
        }

        const selectedCourse = selectedCategory.course;

        res.status(200).json({
			 selectedCourses: selectedCourses,
			// differentCourses: differentCourses,
			// mostSellingCourses: mostSellingCourses,
			success: true,
		});

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Inter Server Error",
            error:error.message,
        })
    }
};

//add course to category
exports.addCourseToCategory = async (req, res) => {
	const { courseId, categoryId } = req.body;
	// console.log("category id", categoryId);
	try {
		const category = await Category.findById(categoryId);
		if (!category) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}
		if(category.courses.includes(courseId)){
			return res.status(200).json({
				success: true,
				message: "Course already exists in the category",
			});
		}
		category.courses.push(courseId);
		await category.save();
		return res.status(200).json({
			success: true,
			message: "Course added to category successfully",
		});
	}
	catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}