import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { config } from "../../../../common/config";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { CourseFilterEntity } from "../../../../types/ICourse";

export const getCoursesForInstructor = createAsyncThunk(
  "course/getCoursesForInstructor",
  async (
    { page, limit,id,filters }: { page: number; limit: number,id:string ,filters:CourseFilterEntity},
    { rejectWithValue }
  ) => {
    try {
      const response = await CLIENT_API.get("/api/course/getCoursesForInstructor", {
        params: {
          page,
          limit,
          id,
          filters
        },
        ...config,
      });
      console.log(response, "iam from getCoursesForInstructor from redux action");
      return response.data
    } catch (error: unknown) {
      console.log("Error from getCoursesForInstructor:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);