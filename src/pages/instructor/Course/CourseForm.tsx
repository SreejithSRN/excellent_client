import { useRef, useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import BasicCourseInfo from "./BasicCouseInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import PricingSection from "./PricingSection";
import ThumbnailUpload from "./ThumbnailUpload";
import ImageUpload, { VideoUpload } from "../../../utilities/axios/cloudinary";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LessonsSection from "./LessonSection";
import { Lesson } from "../../../types/ICourse";
import { courseValidationSchema } from "../../../utilities/validation/courseValidationSchema";
import { useAppDispatch } from "../../../hooks/accessHook";
import { addCourse } from "../../../redux/store/actions/course/addCourseAction";
import { useNavigate } from "react-router-dom";


const CourseForm = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch=useAppDispatch()
  const navigate=useNavigate()

  const handlePublish = async () => {
    if (formikRef.current) {
      const errors = await formikRef.current.validateForm();
      formikRef.current.setTouched({
        title: true,
        description: true,
        category: true,
        level: true,
        language: true,
        pricingType: true,
        price: true,
        thumbnail: true,
        lessons: formikRef.current.values.lessons.map(() => ({
          title: true,
          description: true,
          video: true,
          duration: true,
        })),
      });

      if (Object.keys(errors).length > 0) {
        toast.error("Please provide all the required values before submitting.");
        return;
      }

      const values = formikRef.current.values;

      try {
        setIsUploading(true);
        setUploadProgress(0);

        let imageUrl = values.thumbnail;

        if (!values.thumbnail) {
          toast.error("Course thumbnail is required.");
          return;
        }

        if (typeof values.thumbnail !== "string") {
          // Upload thumbnail to Cloudinary before submitting
          imageUrl = await ImageUpload(values.thumbnail);
        }

        if (!imageUrl) {
          toast.error("Failed to upload thumbnail. Please try again.");
          return;
        }

        // Upload lesson videos to Cloudinary
       

        const uploadedLessons = await Promise.all(
          values.lessons.map(async (lesson: Lesson, index: number) => {
            if (lesson.video instanceof File) {
              const videoUrl = await VideoUpload(lesson.video, (progress) =>
                setUploadProgress(progress)
              );
        
              if (!videoUrl) {
                toast.error(`Failed to upload video for lesson ${index + 1}`);
                throw new Error("Video upload failed");
              }
              return { ...lesson, video: videoUrl };
            }
            return lesson;
          })
        );
        

        console.log("All videos uploaded:", uploadedLessons);
        toast.success("All videos uploaded successfully!");

        // Update values with Cloudinary image URL
        const finalValues = { ...values, thumbnail: imageUrl, lessons: uploadedLessons };

        console.log("Submitting form:", finalValues);

        const results = await dispatch(addCourse(finalValues))
        console.log(results,"gsduhbadghdsjbsdjbhjdsbjbdsjbsdfj")
        if(!results.payload.success){
          toast.error(results.payload.message ||"Course Adding failed,try again.....")
          return
        }

        toast.success(results.payload.message || "ghcghchgccxgfddgfd")
        navigate("/instructor/courses",{replace:true})

        // Call your API or backend service to save finalValues
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        category: "",
        level: "",
        language: "",
        InstructorRef: data?._id,
        pricingType: "",
        price: "",
        thumbnail: null,
        lessons: [],
      }}
      validationSchema={courseValidationSchema}
      innerRef={formikRef}
      onSubmit={(values) => console.log("Form Data Submitted:", values)}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Create New Course</h2>

          <div className="space-y-6">
            <BasicCourseInfo values={values} setFieldValue={setFieldValue} touched={touched} errors={errors} />
            <PricingSection values={values} setFieldValue={setFieldValue} touched={touched} errors={errors} />
            <ThumbnailUpload values={values} setFieldValue={setFieldValue} touched={touched} errors={errors} />
            <LessonsSection values={values} setFieldValue={setFieldValue} touched={touched} errors={errors} />

            <div className="flex justify-end space-x-4">
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
              </button>

              <button type="button" onClick={handlePublish} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <span className="animate-spin h-5 w-5 mr-2 text-white">⏳</span>
                    {uploadProgress}% Uploaded...
                  </>
                ) : (
                  "Publish Course"
                )}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CourseForm;