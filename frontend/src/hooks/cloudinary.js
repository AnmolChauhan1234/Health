import { useState } from "react";
import axios from "axios";
import { useUserContext } from "../context/UserContext/UserContextProvider";

const useCloudinaryUpload = () => {

    // const { userRole } = useUserContext();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    //Upload Preset to choose the preset based on the role provided.
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    //cloud name from .env
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    // Cloudinary upload Url .
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    
    //Uploading Image to Cloudinary
    const uploadToCloudinary = async (file , folder) => {

        // Return if there is no file to upload.
        if (!file) return;

        // Validate upload preset and cloud name
        if (!uploadPreset || !cloudName) {
            console.error("Upload preset or cloud name is not defined.");
            setError("Upload preset or cloud name is not defined.");
            return null;
        }

        // console.log("Using upload preset:", uploadPreset);
        // console.log("Using cloud name:", cloudName);

        const formData = new FormData();

        // Adding required Cloudinary data to the form
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", cloudName);
        formData.append("folder",folder);

        try {

            setUploading(true);
            setError(null);

            const response = await axios.post(uploadUrl, formData);

            // Store uploaded image URL
            setImageUrl(response.data.secure_url);

            // Display message
            console.log("Image uploaded successfully");

            console.log(response.data.secure_url)

            // Return URL for further use
            return response.data.secure_url;
            

        } catch (error) {

            console.error("Cloudinary Upload Error:", error);
            setError(error);
            return null;

        } finally {

            // Setting upload status to false.
            setUploading(false);
        }
    };

    return { uploadToCloudinary, uploading, error, imageUrl };
};

export default useCloudinaryUpload;
