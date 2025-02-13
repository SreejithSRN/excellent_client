import { createAsyncThunk } from "@reduxjs/toolkit";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";
import { AxiosError } from "axios";
import { CourseEntity } from "../../../../types/ICourse";

export const addCourse = createAsyncThunk(
    "course/addCourse",
    async (data: CourseEntity, { rejectWithValue }) => {
      try {
          const response=await CLIENT_API.post("/api/course/addCourse",data,config)

          console.log(response,"iam in addcourse redux action")
          if(response){
            return response.data
          }else{
            throw new Error ("something went wrong in addCategoryAction")
          }      
  
      } catch (error: unknown) {
        console.log("Error from approveReject:", error);
        const e: AxiosError = error as AxiosError;
        return rejectWithValue(e.response?.data || e.message);
      }
    }
  );