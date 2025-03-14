import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const approveReject = createAsyncThunk(
  "auth/approveReject",
  async ({email,reason}:{email: string, reason:string}, { rejectWithValue }) => {
    try {
        const response=await CLIENT_API.post("/api/auth/approveReject",{email,reason},config)
        console.log(response,"iam from redux action approveReject")
        return response.data
    } catch (error: unknown) {
      console.log("Error from approveReject:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);