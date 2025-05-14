

import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Instagram,
  GraduationCap,
  Briefcase,
  FileText,
  Camera,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../../hooks/accessHook";
import { profileEdit } from "../../redux/store/actions/auth";
import ImageUpload from "../../utilities/axios/cloudinary";
import { profileImageEdit } from "../../redux/store/actions/auth/profileImageAction";
import ChangePasswordModal, { ChangepasswordData } from "./ChangePasswordModal";
import { passwordChange } from "../../redux/store/actions/auth/passwordChange";
import { messages } from "../../common/messages";
import { SignupFormData } from "../../types";
// import { messages } from "../../common/Messages";


function ProfileField({
  icon: Icon,
  label,
  value,
  onChange,
  editable = false,
  type = "text", // Default type is "text", use "url" for social links
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
  type?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
      <Icon className="w-5 h-5 text-indigo-600 mt-0.5" />
      <div className="flex-1">
        <p
          className={
            editable ? "font-medium text-red-700" : "font-medium text-gray-700"
          }
        >
          {label}
        </p>
        {editable ? (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={`Enter ${label}`}
            className="w-full bg-transparent border-b border-gray-200 focus:border-indigo-600 outline-none py-1 text-sm text-gray-900"
          />
        ) : type === "url" && value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-700 hover:text-indigo-600 transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-gray-500">{value || "Not Updated"}</p>
        )}
      </div>
    </div>
  );
}

const ProfilePage: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialProfileData = {
    role: data?.role,
    name: data?.name,
    lastName: data?.lastName || "Not Updated",
    firstName: data?.firstName || "Not Updated",
    email: data?.email,
    profile: {
      avatar:
        data?.profile.avatar ||
        messages.avatar,
      gender: data?.profile.gender || "",
      dateOfBirth: data?.profile.dateOfBirth || "Not Updated",
    },
    contact: {
      phone: data?.contact.phone || "Not Updated",
      address: data?.contact.address || "Not Updated",
      social: {
        linkedin: data?.contact.social.linkedin || "Not Updated",
        github: data?.contact.social.github || "Not Updated",
        instagram: data?.contact.social.instagram || "Not Updated",
      },
    },
    profession: data?.profession || "not working",
    qualification: data?.qualification || "Not Updated",
    cv: data?.cv || "Not Updated",
  } as SignupFormData;
  console.log(
    initialProfileData.profile.avatar,
    "testing ......................."
  );

  const location = useLocation();
  const dispatch = useAppDispatch();
  const message = location.state?.message || "";
  const [profileImage, setProfileImage] = useState(
    data?.profile?.avatar ||
      messages.avatar1
  );
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);

  const [tempProfileData, setTempProfileData] = useState(profileData);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const imageFile = event.target.files[0];
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];

    // Validate file type
    if (!validImageTypes.includes(imageFile.type)) {
      toast.error(
        "Invalid image format. Please upload a PNG, JPEG, or JPG file."
      );
      return;
    }

    try {
      const uploadedImageUrl = await ImageUpload(imageFile);
      if (uploadedImageUrl) {
        setProfileImage(uploadedImageUrl);
        const response = await dispatch(
          profileImageEdit({
            image: uploadedImageUrl,
            email: data?.email as string,
          })
        );
        if (response.payload.success) {
          toast.success("Image uploaded successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        } else {
          toast.error("Something went wrong, try again......");
        }
      } else {
        toast.error(
          "Invalid image format. Please upload a PNG, JPEG, or JPG file."
        );
      }
    } catch (error) {
      toast.error("Failed to upload the image. Please try again.");
      console.error("Image upload error:", error);
    }
  };

  const socialFields = [
    { label: "LinkedIn", key: "linkedin", icon: Linkedin },
    { label: "GitHub", key: "github", icon: Github },
    { label: "Instagram", key: "instagram", icon: Instagram },
  ];

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  const capitalizeLastName = (lastName: any) =>
    lastName
      .split(" ")
      .map(
        (word: any) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");

  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 2000, // Closes the toast after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }, [message]);

  const handleFieldChange = (field: string) => (value: string) => {
    const keys = field.split("."); // Split the field string into an array of keys (e.g., 'profile.gender' becomes ['profile', 'gender'])

    setTempProfileData((prev) => {
      let updatedData = { ...prev };
      let target = updatedData;

      // Traverse through the keys and update the final field
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          (target as any)[key] = value; // Update the final field with the new value
        } else {
          (target as any)[key] = { ...(target as any)[key] }; // Make a copy of the current object to ensure immutability
          target = (target as any)[key]; // Move deeper into the nested structure
        }
      });

      return updatedData;
    });
  };

  const handleSave = async () => {
    const response = await dispatch(profileEdit(tempProfileData));
    console.log(response);

    toast.success("Profile updated successfully!");
    setProfileData(tempProfileData);    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfileData(profileData);
    setIsEditing(false);
  };
  const handlePasswordSubmit = async (data1: ChangepasswordData) => {
    console.log("Passwords:", data1);
    const response = await dispatch(
      passwordChange({ ...data1, email: data?.email })
    );
    if (response.payload.success) {
      setIsModalOpen(false);
      toast.success("Password Updated Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      toast.error(response.payload.message);
    }
    console.log(response, "from profile edit page");
  };
  function getSocialValue(data: any,key: string): string {
     return data?.contact?.social?.[key] ?? "";
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <ToastContainer />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 text-center">
          <div className="relative inline-block group">
            <img          
               src={
                typeof profileImage === "string" 
                  ? profileImage 
                  : profileImage instanceof File 
                  ? URL.createObjectURL(profileImage) 
                  : undefined
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />{" "}
            {!isEditing && (
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 rounded-full cursor-pointer flex items-center justify-center border-4 border-white shadow-lg hover:bg-indigo-700 transition-colors group">
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <span className="absolute invisible group-hover:visible bg-black text-white text-xs py-1 px-2 rounded -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  Change Photo
                </span>
              </label>
            )}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {data?.firstName && data?.lastName
              ? `${capitalizeFirstLetter(
                  data?.firstName ?? "Hi"
                )} ${capitalizeLastName(data?.lastName ?? "")}`
              : `${capitalizeLastName(data?.name)}`}
          </h1>
          <p className="text-indigo-600 font-medium">
            {data?.role === "student" ? "Student" : data?.profession}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
            <User className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-gray-900">{data?.name}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
            <Mail className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{data?.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
            <Briefcase className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-gray-900">{data?.role}</p>
            </div>
          </div>

          <ProfileField
            icon={User}
            label="First Name"
            value={tempProfileData?.firstName}
            onChange={handleFieldChange("firstName")}
            editable={isEditing}
          />
          <ProfileField
            icon={User}
            label="Last Name"
            value={tempProfileData?.lastName}
            onChange={handleFieldChange("lastName")}
            editable={isEditing}
          />

          <ProfileField
            icon={User}
            label="Gender"
            value={tempProfileData?.profile?.gender!}
            onChange={handleFieldChange("profile.gender")}
            editable={isEditing}
          />

          <ProfileField
            icon={Calendar}
            label="Date of Birth"
            value={
              !tempProfileData.profile?.dateOfBirth
                ? "Not Updated"
                : tempProfileData.profile?.dateOfBirth
            }
            onChange={handleFieldChange("profile.dateOfBirth")}
            editable={isEditing}
          />

          <ProfileField
            icon={Phone}
            label="Phone"
            value={tempProfileData.contact?.phone!}
            onChange={handleFieldChange("contact.phone")}
            editable={isEditing}
          />

          <ProfileField
            icon={MapPin}
            label="Address"
            value={tempProfileData.contact?.address!}
            onChange={handleFieldChange("contact.address")}
            editable={isEditing}
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4">Social Links</h2>
          <div className="grid grid-cols-3 gap-4">
            {socialFields.map(({ label, key, icon }) => (
              <ProfileField
                key={key}
                icon={icon}
                label={label}
                value={getSocialValue(tempProfileData, key)}

                onChange={(value) =>
                  handleFieldChange(`contact.social.${key}`)(value)
                }
                editable={isEditing}
                type="url" // For social links, the type is "url"
              />
            ))}
          </div>
        </div>

        {data?.role === "instructor" && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Professional Information
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Profession</p>
                  <p className="text-gray-900">{tempProfileData.profession}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Qualification</p>
                  <p className="text-gray-900">
                    {tempProfileData.qualification}
                  </p>
                </div>
              </div>
              <a
               href={
                typeof tempProfileData.cv === "string"
                  ? tempProfileData.cv
                  : tempProfileData.cv instanceof File
                  ? URL.createObjectURL(tempProfileData.cv)
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span>Show CV</span>
              </a>
            </div>
          </div>
        )}

        {data?.role != "admin" && (
          <div className="text-center pt-5">
            {!isEditing ? (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
                >
                  Change Password
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Ensure this is working as expected
        onSubmit={handlePasswordSubmit}
      />
    </div>
  );
};

export default ProfilePage;






















