import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupFormData } from "../../../types/IForm";
import { signupAction } from "../actions/auth/signUpAction";
import { loginAction } from "../actions/auth/loginAction";
import { getUserDataAction, logoutAction, profileEdit } from "../actions/auth";
import { registerForm } from "../actions/auth/registerForm";
import { profileImageEdit } from "../actions/auth/profileImageAction";

export interface userState {
  loading: boolean;
  data: SignupFormData | null;
  error: string | null | undefined;
  message: string | null;
}

const initialState: userState = {
  loading: false,
  data: null,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserData: (
      state: userState,
      action: PayloadAction<SignupFormData>
    ) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //Signup Action
      .addCase(signupAction.pending, (state: userState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signupAction.fulfilled,
        (state: userState, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload.data || null;
          state.error = null;
        }
      )
      .addCase(signupAction.rejected, (state: userState, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message || "Signup Failed";
      })

      //Login Action
      .addCase(loginAction.pending, (state: userState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAction.fulfilled,
        (state: userState, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload.data || null;
          state.error = null;
        }
      )
      .addCase(loginAction.rejected, (state: userState, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message || "Login Failed";
      })

      // Get User Data Action

      .addCase(getUserDataAction.pending, (state: userState) => {
        state.loading = true;
      })
      .addCase(
        getUserDataAction.fulfilled,
        (state: userState, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload.data || null;
          state.error = null;
        }
      )
      .addCase(getUserDataAction.rejected, (state: userState, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetching user data failed";
        state.data = null;
      })

      // logOut Action

      .addCase(logoutAction.pending, (state: userState) => {
        state.loading = true;
      })
      .addCase(logoutAction.rejected, (state: userState, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message || "Logout failed";
      })
      .addCase(logoutAction.fulfilled, (state: userState) => {
        state.loading = false;
        state.data = null;
        state.error = null;
      })

      .addCase(registerForm.pending, (state: userState) => {
        state.loading = true;
      })
      .addCase(registerForm.rejected, (state: userState, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message || "Logout failed";
      })
      .addCase(registerForm.fulfilled, (state: userState) => {
        state.loading = false;
        state.data = null;
        state.error = null;
      })

      //Profile Edit Action

      .addCase(profileEdit.pending, (state: userState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        profileEdit.fulfilled,
        (state: userState, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload.data || null;
          state.error = null;
        }
      )
      .addCase(profileEdit.rejected, (state: userState, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message || "Signup Failed";
      })

      .addCase(profileImageEdit.pending, (state: userState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        profileImageEdit.fulfilled,
        (state: userState, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload.data || null;
          state.error = null;
        }
      )
      .addCase(profileImageEdit.rejected, (state: userState, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message || "Signup Failed";
      })




  },
});

export const { storeUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;

//Verify User otp and save
// .addCase(verifyOtpAction.pending, (state: userState) => {
//   state.loading = true;
//   state.error = null;
// })
// .addCase(
//   verifyOtpAction.fulfilled,
//   (state: userState, action: PayloadAction<any>) => {
//     state.loading = false;
//     state.data = action.payload.data || null;
//     state.message=action.payload.message
//     state.error = null;
//   })
// .addCase(verifyOtpAction.rejected,(state:userState,action:PayloadAction<any>) =>{
//   state.loading=false;
//   state.data=action.payload.data;
//   state.error=action.payload.message || "signup failed"
// })
