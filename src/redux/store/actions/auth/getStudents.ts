import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const getStudents = createAsyncThunk(
  "auth/getStudents",
  async (
    { page, limit,search }: { page: number; limit: number;search:string },
    { rejectWithValue }
  ) => {
    try {
      const response = await CLIENT_API.get("/api/auth/getStudents", {
        params: {
          page,
          limit,
          search
        },
        ...config,
      });

      console.log(response.data, "iam from getstudent from redux action......");
      return response.data; // Return the data to be used in the reducer
    } catch (error: unknown) {
      console.log("Error from getStudents:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
