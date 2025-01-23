import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const forgotPasswordAction = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post(
        "/api/auth/forgotPassword",
        { email },
        config
      );
      console.log(
        response,
        "iam from forgotPassword in redux action................."
      );
    } catch (error: unknown) {
      console.log(
        "Error from forgotPassword in redux action.................",
        error
      );
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
