import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { config } from "../../../../common/config";
import { CLIENT_API } from "../../../../utilities/axios/instance";

export const getCategories = createAsyncThunk(
  "course/getCategories",
  async (
    { page, limit,search }: { page: number; limit: number; search?:string },
    { rejectWithValue }
  ) => {
    try {
      const response = await CLIENT_API.get("/api/course/getCategories", {
        params: {
          page,
          limit,
          search
        },
        ...config,
      });
      console.log(response, "iam from getcategories from redux action");
      return response.data
    } catch (error: unknown) {
      console.log("Error from getStudents:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
