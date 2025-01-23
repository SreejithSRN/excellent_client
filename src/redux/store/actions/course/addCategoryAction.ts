import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../../../../types";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";


export const addCategory = createAsyncThunk(
  "course/addCategory",
  async (data: Category, { rejectWithValue }) => {
    try {
        const response=await CLIENT_API.post("/api/course/addCategory",data,config)
        if(response){
          return response.data
        }else{
          throw new Error ("something went wrong in addCategoryAction")
        }      

    } catch (error: unknown) {
      console.log("Error from approveReject:", error);
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
