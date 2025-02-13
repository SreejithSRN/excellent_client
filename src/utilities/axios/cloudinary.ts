import axios from "axios";
import { env } from "../../common/env";

const PRESET_KEY = env.CLOUDINARY_PRESET_KEY;
const CLOUDINARY_API = env.CLOUDINARY_URL;

const ImageUpload = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", PRESET_KEY);

  try {
    const res = await axios.post(`${CLOUDINARY_API}/image/upload`, formData);
    const { format, secure_url } = res.data;
    console.log(secure_url, ",..............................");
    if (["png", "jpeg", "jpg", "pdf"].includes(format)) {
      return secure_url;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
export default ImageUpload


export const VideoUpload = async (
  videoFile: File | string | undefined,
  onProgress: (progress: number) => void
): Promise<string | undefined> => {
  if (!videoFile) return undefined;
  if (typeof videoFile === "string") {
    return videoFile;
  }
  const formData = new FormData();
  formData.append("file", videoFile);
  formData.append("upload_preset", PRESET_KEY);
  try {
    const { data } = await axios.post(
      `${CLOUDINARY_API}/video/upload`, 
      formData,
      {
        withCredentials: false,
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total ?? 1;
          const progress = Math.round((progressEvent.loaded * 100) / total);
          onProgress(progress);
        },
      }
    );
    console.log(data);
    return data.secure_url;
  } catch (error) {
    console.error("Video upload failed:", error);
    return undefined;
  }
};

