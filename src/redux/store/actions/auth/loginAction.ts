import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginFormData } from "../../../../types";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (data: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post("/api/auth/login", data, config);
      console.log(response, "iam from auth login action...................");
      if (response.data.success) {

        return response.data;
      } else {
        rejectWithValue(response.data);
      }
    } catch (error: unknown) {
      const e: AxiosError = error as AxiosError;
      console.log("object");
      console.log(e.message);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
