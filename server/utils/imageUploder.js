const cloudinary = require('cloudinary').v2;
const fs = require("fs");

exports.uploadImageToCloudinary = async (file, folder,height, quality)=>{
    const options = {folder};

    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    fs.unlinkSync(file.tempFilePath);
    return result;

}

