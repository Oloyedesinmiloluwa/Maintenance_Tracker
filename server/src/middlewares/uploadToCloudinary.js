import cloudinary from 'cloudinary';

const uploadToCloudinary = (req, res, next) => {
  if (!req.body.image) return next();
  return cloudinary.uploader.upload(req.body.image, (result, error) => {
    if (result.error) return res.status(400).json({ message: 'Image failed to upload'}); 
    req.body.image = result.url;
    return next();
  }, { folder: 'm-tracker', transformation: { width: 256, height: 256, crop: 'limit'} });
};
export default uploadToCloudinary;
