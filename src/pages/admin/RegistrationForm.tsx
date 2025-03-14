import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useAppDispatch } from "../../hooks/accessHook";
import { registerForm } from "../../redux/store/actions/auth/registerForm";
import {
  Gender,
  Profession,
  Qualification,
  Role,
  SignupFormData,
} from "../../types";
import { useNavigate } from "react-router-dom";
import { registrationSchema } from "../../utilities/validation/registrationSchema";
import {
  Upload,
  User,
  Briefcase,
  MapPin,
  Link,
  Calendar,
  Phone,
  Mail,
  UserCircle,
} from "lucide-react";
import ImageUpload from "../../utilities/axios/cloudinary";

const RegistrationForm = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik<SignupFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: data?.email || "",
      name: data?.name || "",
      role: Role.Instructor,
      qualification: data?.qualification || Qualification.Initial,
      cv: data?.cv || "",
      contact: {
        phone: "",
        address: "",
        social: {
          linkedin: "",
          github: "",
          instagram: "",
        },
      },
      profile: {
        avatar: data?.profile?.avatar || "",
        gender: Gender.Male,
        dateOfBirth: data?.profile?.dateOfBirth || "",
      },
      profession: data?.profession || Profession.Initial,
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      const upload_cv = await ImageUpload(values.cv as File);
      const upload_image = await ImageUpload(values.profile.avatar as File);
      values.profile.avatar = upload_image;
      let value1 = { ...values, cv: upload_cv };

      const response = await dispatch(registerForm(value1));
      if (response.payload.success) {
        navigate("/", {
          state: {
            message:
              "Thank you, your registration was successful. Our team will notify you once it is approved.",
          },
        });
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Register Your Account
            </h1>
            <p className="text-blue-100">Join our community of instructors</p>
          </div>

          {/* Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="p-8"
            encType="multipart/form-data"
          >
            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-12">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm mt-2 text-gray-600">
                    Personal Info
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm mt-2 text-gray-600">
                    Professional
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Link className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm mt-2 text-gray-600">Social</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Personal Information Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name{" "}
                        <span className="text-red-500 text-[14px]">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your first name"
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name{" "}
                        <span className="text-red-500 text-[14px]">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your last name"
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Gender and Date of Birth */}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender{" "}
                        <span className="text-red-500 text-[14px]">*</span>
                      </label>
                      <select
                        id="gender"
                        name="profile.gender"
                        value={formik.values.profile?.gender}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select gender</option>
                        {Object.values(Gender).map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                      {formik.touched.profile?.gender &&
                        formik.errors.profile?.gender && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.profile?.gender}
                          </p>
                        )}
                    </div>
                    <div>
                      <label
                        htmlFor="profile.dateOfBirth"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Birth{" "}
                        <span className="text-red-500 text-[14px]">*</span>
                      </label>
                      <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="profile.dateOfBirth"
                          name="profile.dateOfBirth"
                          value={formik.values.profile?.dateOfBirth}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="pl-10 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          max={(() => {
                            const today = new Date();
                            today.setFullYear(today.getFullYear() - 18);
                            return today.toISOString().split("T")[0];
                          })()}
                        />
                      </div>
                      {formik.touched.profile?.dateOfBirth &&
                        formik.errors.profile?.dateOfBirth && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.profile?.dateOfBirth}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Email and Name (Read-only) */}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formik.values.email}
                          className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-sm cursor-not-allowed"
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserCircle className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formik.values.name}
                          className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-sm cursor-not-allowed"
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role (Disabled) */}
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formik.values.role}
                      className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-sm cursor-not-allowed"
                      disabled
                    >
                      <option value="instructor">Instructor</option>
                    </select>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4 md:col-span-2">
                    <div>
                      <label
                        htmlFor="contact.phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number{" "}
                        <span className="text-red-500 text-[14px]">*</span>
                      </label>
                      <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="contact.phone"
                          name="contact.phone"
                          value={formik.values.contact?.phone}
                          onChange={(event) => {
                            const value = event.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            formik.setFieldValue("contact.phone", value);
                          }}
                          className="pl-10 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter phone number"
                          inputMode="numeric"
                        />
                      </div>
                      {formik.touched.contact?.phone &&
                        formik.errors.contact?.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.contact.phone}
                          </p>
                        )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact.address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address{" "}
                        <span className="text-red-500 text-[14px]">*</span>
                      </label>
                      <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="contact.address"
                          name="contact.address"
                          value={formik.values.contact?.address}
                          onChange={formik.handleChange}
                          rows={3}
                          className="pl-10 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your address"
                        />
                      </div>
                      {formik.touched.contact?.address &&
                        formik.errors.contact?.address && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.contact?.address}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Professional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Qualification */}
                  <div>
                    <label
                      htmlFor="qualification"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Qualification{" "}
                      <span className="text-red-500 text-[14px]">*</span>
                    </label>
                    <select
                      id="qualification"
                      name="qualification"
                      value={formik.values.qualification}
                      onChange={formik.handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select your qualification</option>
                      {Object.values(Qualification).map((qualification) => (
                        <option key={qualification} value={qualification}>
                          {qualification.replace("_", " ").toUpperCase()}
                        </option>
                      ))}
                    </select>
                    {formik.touched.qualification &&
                      formik.errors.qualification && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.qualification}
                        </p>
                      )}
                  </div>

                  {/* Profession */}
                  <div>
                    <label
                      htmlFor="profession"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Profession{" "}
                      <span className="text-red-500 text-[14px]">*</span>
                    </label>
                    <select
                      id="profession"
                      name="profession"
                      value={formik.values.profession}
                      onChange={formik.handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select your profession</option>
                      {Object.values(Profession).map((profession) => (
                        <option key={profession} value={profession}>
                          {profession.replace("_", " ").toUpperCase()}
                        </option>
                      ))}
                    </select>
                    {formik.touched.profession && formik.errors.profession && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.profession}
                      </p>
                    )}
                  </div>

                  {/* File Uploads */}
                  <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CV Upload */}
                    <div className="relative">
                      <label
                        htmlFor="cv"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Upload CV{" "}
                        <span className="text-red-500 text-[14px]">*</span>
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="cv"
                              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="cv"
                                name="cv"
                                type="file"
                                accept=".pdf"
                                className="sr-only"
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "cv",
                                    event.currentTarget.files?.[0] || null
                                  );
                                }}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PDF up to 5MB</p>
                          {formik.values.cv && (
                            <p className="text-sm text-gray-600">
                              Selected: {(formik.values.cv as File).name}
                            </p>
                          )}
                        </div>
                      </div>
                      {formik.touched.cv && formik.errors.cv && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.cv}
                        </p>
                      )}
                    </div>

                    {/* Profile Image Upload */}
                    <div className="relative">
                      <label
                        htmlFor="avatar"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Profile Image{" "}
                        <span className="text-red-500 text-[14px]">*</span>
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                        <div className="space-y-1 text-center">
                          <User className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="avatar"
                              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                            >
                              <span>Upload a photo</span>
                              <input
                                id="avatar"
                                name="profile.avatar"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "profile.avatar",
                                    event.currentTarget.files?.[0] || null
                                  );
                                }}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG up to 2MB
                          </p>
                          {formik.values.profile?.avatar && (
                            <p className="text-sm text-gray-600">
                              Selected:{" "}
                              {(formik.values.profile.avatar as File).name}
                            </p>
                          )}
                        </div>
                      </div>
                      {formik.touched.profile?.avatar &&
                        formik.errors.profile?.avatar && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.profile?.avatar}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Social Links
                </h2>
                <div className="space-y-4">
                  {/* LinkedIn */}
                  <div>
                    <label
                      htmlFor="linkedin"
                      className="block text-sm font-medium text-gray-700"
                    >
                      LinkedIn{" "}
                      <span className="text-red-500 text-[14px]">*</span>
                    </label>
                    <input
                      type="url"
                      id="contact.social.linkedin"
                      name="contact.social.linkedin"
                      value={formik.values.contact.social?.linkedin || ""}
                      onChange={formik.handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                    {formik.touched.contact?.social?.linkedin &&
                      formik.errors.contact?.social?.linkedin && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.contact.social?.linkedin}
                        </p>
                      )}
                  </div>

                  {/* GitHub */}
                  <div>
                    <label
                      htmlFor="github"
                      className="block text-sm font-medium text-gray-700"
                    >
                      GitHub{" "}
                      <span className="text-black-500 text-[10px]">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="url"
                      id="contact.social.github"
                      name="contact.social.github"
                      value={formik.values.contact.social?.github || ""}
                      onChange={formik.handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <label
                      htmlFor="instagram"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Instagram{" "}
                      <span className="text-black-500 text-[10px]">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="url"
                      id="contact.social.instagram"
                      name="contact.social.instagram"
                      value={formik.values.contact.social?.instagram || ""}
                      onChange={formik.handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://instagram.com/yourusername"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02]"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
