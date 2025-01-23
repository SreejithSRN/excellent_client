import { createAsyncThunk } from "@reduxjs/toolkit";
import {  SignupFormData } from "../../../../types/IForm";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";
import { AxiosError } from "axios";

export const signupAction = createAsyncThunk<any, SignupFormData>(
  "auth/signup",
  async (data: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post("/api/auth/signup", data, config);      
      if (response.data.success) {
        return response.data;
      } else {
        rejectWithValue(response.data);
      }
    } catch (error: unknown) {
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data);
    }
  }
);
