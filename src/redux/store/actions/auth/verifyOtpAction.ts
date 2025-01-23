import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SignupFormData } from "../../../../types/IForm";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const verifyOtpAction = createAsyncThunk(
  "auth/verifyOtp",
  async (
    value: { data: SignupFormData | null; otp: number | string },
    { rejectWithValue }
  ) => {
    try {
      const response = await CLIENT_API.post(
        "/api/auth/verifyOtp",
        value,
        config
      );
      if (response.data.success) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error: unknown) {
      console.log("OTP verification error", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
