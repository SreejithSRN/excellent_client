import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupFormData } from "../../../../types";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const profileEdit = createAsyncThunk(
  "auth/profileEdit",
  async (data: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post(
        "/api/auth/profileEdit",
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
