import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const getMyCoursesById = createAsyncThunk(
  "/course/getMyCoursesById",
  async (courseId: string, { rejectWithValue }) => {
    try {        
      const response = await CLIENT_API.get(`/api/course/getMyCoursesById/${courseId}`, config);      
      if (response.data.success){
        return response.data
      }    
    } catch (error: unknown) {
      console.error("Error from getMyCoursesById:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);