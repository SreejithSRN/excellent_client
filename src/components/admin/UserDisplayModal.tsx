import React from "react";
import { Mail, User, Phone, Calendar, MapPin } from "lucide-react";
import { SignupFormData } from "../../types";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: SignupFormData | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, userData }) => {
  if (!isOpen || !userData) return null;
  const renderProfileImage = () => {
    if (userData.profile?.avatar) {
      const avatarSrc =
        typeof userData.profile.avatar === "string"
          ? userData.profile.avatar
          : URL.createObjectURL(userData.profile.avatar);
  
      return (
        <img
          src={avatarSrc}
          alt={`${userData.name || "User"}'s Profile`}
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-600"
        />
      );
    } else {
      const initials = userData.name?.charAt(0).toUpperCase() || "U";
      return (
        <div className="w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-3xl border-4 border-indigo-600">
          {initials}
        </div>
      );
    }
  };
  ;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
      <div className="flex justify-center mb-6">
          {renderProfileImage()}
        </div>
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">User Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✖
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-gray-900">{userData.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{userData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="text-gray-900">{userData.firstName ||"Not Updated"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="text-gray-900">{userData.lastName ||"Not Updated"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="text-gray-900">{userData.profile.gender ||"Not Updated"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-gray-900">{userData.profile.dateOfBirth ||"Not Updated"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900">{userData?.contact?.phone || "Not Updated"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-gray-900">
                {userData?.profile?.dateOfBirth || "Not Updated"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-900">{userData?.contact?.address || "Not Updated"}</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
