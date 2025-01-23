import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChangepasswordData } from "../../../../pages/common/ChangePasswordModal";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const passwordChange = createAsyncThunk(
  "auth/passwordChange",
  async (data: ChangepasswordData, { rejectWithValue }) => {
    try {
      const response = await CLIENT_API.post(
        "/api/auth/passwordChange",
        data,
        config
      );
      console.log(response, "iam from passwordchange action in redux");
      return response.data
    } catch (error: unknown) {
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data);
    }
  }
);
