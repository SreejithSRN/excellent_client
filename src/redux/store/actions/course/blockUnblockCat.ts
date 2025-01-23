import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const blockUnblockCat=createAsyncThunk(
    "course/blockUnblockCat",
    async(id:string,{rejectWithValue})=>{
        try {          
            const response= await CLIENT_API.post("/api/course/blockUnblockCat",{id},config)
            console.log(response,"iam from blockunblock redux action")
            return response.data
            
        } catch (error: unknown) {
              console.log("Error from blockUnblockCat:", error);
              const e: AxiosError = error as AxiosError;
              return rejectWithValue(e.response?.data || e.message);
            }
    }
)