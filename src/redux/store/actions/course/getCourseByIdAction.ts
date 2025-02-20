import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const getCoursesById = createAsyncThunk(
  "/course/getCoursesById",
  async (courseId: string, { rejectWithValue }) => {
    try {
        
      const response = await CLIENT_API.get(`/api/course/getCoursesById/${courseId}`, config);   
      console.log(response.data,"parayuuuuuuuuu") 
      if (response.data.success){
        return response.data
      }


    
    } catch (error: unknown) {
      console.error("Error from getCoursesById:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
