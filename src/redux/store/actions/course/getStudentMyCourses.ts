import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { config } from "../../../../common/config";
import { CLIENT_API } from "../../../../utilities/axios/instance";

export const getStudentMyCourses = createAsyncThunk(
  "course/getCoursesForInstructor",
  async (
    { page, limit,id }: { page: number; limit: number,id:string },
    { rejectWithValue }
  ) => {
    try {
      const response = await CLIENT_API.get("/api/course/getStudentMyCourses", {
        params: {
          page,
          limit,
          id
        },
        ...config,
      });
      console.log(response, "iam from getStudentMyCourses from redux action");
      return response.data
    } catch (error: unknown) {
      console.log("Error from getStudentMyCourses:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);