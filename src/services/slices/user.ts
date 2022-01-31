import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../../utils/api";
import { RootState, AppDispatch } from "../store";
import { TAuthOutput, TRefreshTokenOutput } from "../../utils/api";

type TUser = {
  name: string;
  email: string;
};

interface IUserState {
  accessToken: string;
  isAuthenticated: boolean;

  user: TUser;

  loading: boolean;
  error: boolean;

  canResetPassword: boolean;
}

export const initialState: IUserState = {
  accessToken: "",
  isAuthenticated: false,

  user: {
    name: "",
    email: "",
  },

  loading: false,
  error: false,

  // неавторизованный пользователя не может зайти на /reset-password,
  // минуя /forgot-password
  canResetPassword: false,
};

export const refreshToken = createAsyncThunk<TRefreshTokenOutput>(
  "user/refresh-token",
  () => {
    const refreshToken = localStorage.getItem("refresh-token");

    if (!refreshToken) {
      throw new Error("There is no refresh token in local storage");
    }

    return api.refreshToken(refreshToken).then((data) => {
      localStorage.setItem("refresh-token", data.refreshToken);
      return { ...data, accessToken: data.accessToken.split("Bearer ")[1] };
    });
  }
);

export const register = createAsyncThunk(
  "user/register",
  (data: { name: string; email: string; password: string }) => {
    return api
      .register(data)
      .then((data) => {
        localStorage.setItem("refresh-token", data.refreshToken);

        return { ...data, accessToken: data.accessToken.split("Bearer ")[1] };
      })
      .catch(() => {
        throw new Error("An error occurred");
      });
  }
);

export const login = createAsyncThunk<
  TAuthOutput,
  { email: string; password: string }
>("user/login", (data) => {
  return api.login(data).then((data) => {
    localStorage.setItem("refresh-token", data.refreshToken);

    return { ...data, accessToken: data.accessToken.split("Bearer ")[1] };
  });
});

export const logout = createAsyncThunk("user/logout", () => {
  const refreshToken = localStorage.getItem("refresh-token");

  if (!refreshToken) {
    throw new Error("There is no refresh token in local storage");
  }

  return api.logout(refreshToken).then((data) => {
    localStorage.removeItem("refresh-token");
    return data;
  });
});

export const forgotPassword = createAsyncThunk(
  "user/forgot-password",
  (email: string) => {
    return api.forgotPassword(email);
  }
);

export const getUser = createAsyncThunk<
  TUser | void,
  void,
  { state: RootState; dispatch: AppDispatch }
>("user/get-user", (_, thunkAPI) => {
  const { accessToken } = thunkAPI.getState().user;
  return api
    .getUser(accessToken)
    .then((data) => data.user)
    .catch(async (err) => {
      if (err.message === "jwt expired" || err.message === "wtf") {
        const resultAction = await thunkAPI.dispatch(refreshToken());
        if (refreshToken.fulfilled.match(resultAction)) {
          thunkAPI.dispatch(getUser());
        }
      }
      thunkAPI.rejectWithValue("error");
    });
});

export const patchUser = createAsyncThunk<
  TUser | void,
  TUser,
  { state: RootState }
>("user/patch-user", (data, thunkAPI) => {
  const { accessToken } = thunkAPI.getState().user;
  return api
    .patchUser(accessToken, data)
    .then((data) => data.user)
    .catch(async (err) => {
      if (err.message === "jwt expired" || err.message === "wtf") {
        const resultAction = await thunkAPI.dispatch(refreshToken());
        if (refreshToken.fulfilled.match(resultAction)) {
          thunkAPI.dispatch(getUser());
        }
      }
      thunkAPI.rejectWithValue("error");
    });
});

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    allowPasswordReset: (state) => {
      state.canResetPassword = true;
    },
    restrictPasswordReset: (state) => {
      state.canResetPassword = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
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
      if (action.payload) {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      }

      state.isAuthenticated = true;
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
      state.isAuthenticated = true;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(logout.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, () => initialState);
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getUser.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(patchUser.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(patchUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    });
    builder.addCase(patchUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const selectIsAuthenticated = (state: RootState) => {
  return state.user.isAuthenticated;
};
export const selectUser = (state: RootState) => {
  return state.user.user;
};
export const selectCanResetPassword = (state: RootState) => {
  return state.user.canResetPassword;
};
export const selectAccessToken = (state: RootState) => {
  return state.user.accessToken;
};

const { actions, reducer } = user;

export const { allowPasswordReset, restrictPasswordReset } = actions;

export default reducer;
