import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const getUserDataAction = createAsyncThunk(
  "auth/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      console.log("iam going to call the server for getuserdata from getuserdata action.......")
      const response = await CLIENT_API.get("/api/auth/getUserData", config);
      console.log(
        response,
        "iam from getUserData Action in reduxsssssssssssss..................."
      );
      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error:unknown) {
      console.log("Error from getUserData", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
