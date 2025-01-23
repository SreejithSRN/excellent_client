import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const resendOtpAction = createAsyncThunk(
  "auth/resentOtp",
  async (email: string | null, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post(
        "/api/auth/resentOtp",
        { email },
        config
      );
      console.log(response, " iam here now");

      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      console.log("Resend OTP verification error", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
