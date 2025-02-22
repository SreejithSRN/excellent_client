import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CLIENT_API } from "../../../../utilities/axios/instance";
import { config } from "../../../../common/config";

export const toggleBlockCourse=createAsyncThunk(
    "course/toggleBlockCourse",
    async(id:string,{rejectWithValue})=>{
        try {   
            console.log(id,"iam in toggle course")       
            const response= await CLIENT_API.put("/api/course/toggleBlockCourse",{id},config)
            console.log(response,"iam from toggleBlockCourseredux action")
            return response.data
            
        } catch (error: unknown) {
              console.log("Error from toggleBlockCourse:", error);
              const e: AxiosError = error as AxiosError;
              return rejectWithValue(e.response?.data || e.message);
            }
    }
)
