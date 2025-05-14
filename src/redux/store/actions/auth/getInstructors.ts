import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";


export const getInstructors = createAsyncThunk(
  "auth/getInstructors", 
  async ({ page, limit,search}: { page: number; limit: number,search:string }, { rejectWithValue }) => {
    try {      
      const response = await CLIENT_API.get("/api/auth/getInstructors", {
        params: {
          page,
          limit,
          search
        },        
        ...config, 
      });

      console.log(response.data, "iam from getInstructors from redux action......");
      return response.data; // Return the data to be used in the reducer
    } catch (error: unknown) {
      console.log("Error from getInstructors:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
