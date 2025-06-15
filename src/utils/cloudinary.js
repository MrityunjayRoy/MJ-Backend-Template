import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCLoudinary = async (loaclFile) => {
    try {
        if (!loaclFile) return null;

        // uploading to cloudinary
        const response = await cloudinary.uploader.upload(
            loaclFile, { public_id: 'shoes' }
        )
        return response;

    } catch (error) {
        fs.unlink(loaclFile);
        console.log("Error uploaing file to cloudinary", error);
        return null;
    }
};

export default uploadOnCLoudinary;