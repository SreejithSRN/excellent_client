import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { config } from "../../../../common/config";
import { CLIENT_API } from "../../../../utilities/axios/instance";

export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await CLIENT_API.get("/api/course/getCourses", {
        params: {
          page,
          limit,
        },
        ...config,
      });
      console.log(response, "iam from getcourses from redux action");
      return response.data
    } catch (error: unknown) {
      console.log("Error from getCourses:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);