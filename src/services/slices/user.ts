import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../../utils/api";
import { RootState } from "../store";

import * as api from "../../utils/api";

interface IUserState {
  accessToken: string;

  user: {
    name: string;
    email: string;
  };

  loading: boolean;
  error: boolean;
}

const initialState: IUserState = {
  accessToken: "",

  user: {
    name: "",
    email: "",
  },

  loading: false,
  error: false,
};

export const refreshToken = createAsyncThunk("user/refresh-token", () => {
  const refreshToken = localStorage.getItem("refresh-token");

  if (!refreshToken) {
    throw new Error("There is no refresh token in local storage");
  }

  return api.refreshToken(refreshToken).then((data) => {
    localStorage.setItem("refresh-token", data.refreshToken);

    return data;
  });
});

export const register = createAsyncThunk(
  "user/register",
  (data: { name: string; email: string; password: string }) => {
    return api
      .register(data)
      .then((data) => {
        localStorage.setItem("refresh-token", data.refreshToken);

        return data;
      })
      .catch((err) => {
        throw new Error("An error occurred");
      });
  }
);

export const login = createAsyncThunk(
  "user/login",
  (data: { email: string; password: string }) => {
    return api.login(data).then((data) => {
      localStorage.setItem("refresh-token", data.refreshToken);

      return data;
    });
  }
);

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(register.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(login.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

const { reducer } = user;

export default reducer;
