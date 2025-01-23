import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const blockUnblock = createAsyncThunk(
  "auth/blockUnblock",
  async (email: string, { rejectWithValue }) => {
    try {
        const response=await CLIENT_API.post("/api/auth/blockUnblock",{email},config)
        console.log(response,"iam from redux action bloclUnblock")
        return response.data
    } catch (error: unknown) {
      console.log("Error from blockUnblock:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
