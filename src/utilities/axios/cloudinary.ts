
import axios from 'axios';
import { env } from '../../common/env';
const ImageUpload = async (image:File) => {
    const PRESET_KEY = env.CLOUDINARY_PRESET_KEY;
    const CLOUDINARY_API =env.CLOUDINARY_URL ;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', PRESET_KEY);

    try {
        const res = await axios.post(`${CLOUDINARY_API}/image/upload`, formData);
        const { format, secure_url } = res.data;
        console.log(secure_url,',..............................');
        if (['png', 'jpeg', 'jpg','pdf'].includes(format)) {
            return secure_url
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export default ImageUpload;
