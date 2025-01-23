import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

interface ProfileProp {
  image: string;
  email: string;
}
export const profileImageEdit = createAsyncThunk(
  "auth/profileImageEdit",
  async (data: ProfileProp, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.put(
        "/api/auth/profileImageEdit",
        data,
        config
      );
      return response.data;
    } catch (error: unknown) {
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data);
    }
  }
);
