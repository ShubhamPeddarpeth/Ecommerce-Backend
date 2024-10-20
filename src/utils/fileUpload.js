import cloudinary from 'cloudinary';

export const uploadImageToCloudinery = async (file) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path);
    return result.secure_url;
    
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('error in uploading image  to cludinery');
  }
};
