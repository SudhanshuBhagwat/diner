import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { API_BASE_URL } from "../constants";

interface IUser {
  id: number;
  uid: string;
  name: string;
  email: string;
  role: string;
}

type AuthState = {
  status: "SIGNED_IN" | "SIGNED_OUT" | "UNKNOWN";
  currentUser: IUser | null;
};

const initialState: AuthState = { status: "UNKNOWN", currentUser: null };

function postUserData(user: User) {
  return fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((result) => result.json())
    .then((result) => {
      const responseData = result.result;
      return {
        ...responseData,
        email: user.email,
      };
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export const signIn = createAsyncThunk(
  "user/signIn",
  async (user: User, thunkApi) => {
    return await postUserData(user);
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.status = "SIGNED_OUT";
      state.currentUser = null;
    },
  },
  extraReducers: {
    [`${signIn.pending}`]: (state) => {
      console.log("Pending");
      state.status = "UNKNOWN";
      state.currentUser = null;
    },
    [`${signIn.fulfilled}`]: (state, { payload }) => {
      console.log("Fulfilled", payload);
      state.status = "SIGNED_IN";
      state.currentUser = payload;
    },
    [`${signIn.rejected}`]: (state) => {
      console.log("Rejected");
      state.status = "SIGNED_OUT";
      state.currentUser = null;
    },
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
