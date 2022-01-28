import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  postOrder,
  TPostOrderOutput,
  fetchOrders,
} from "../../utils/api";
import { RootState, AppDispatch } from "../store";
import { TOrder, updateOrders } from "./ws-orders";

type TOrderDetails = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

interface IOrderState {
  orderDetails: TOrderDetails;
  orderDetailsLoading: boolean;
  orderDetailsError: boolean;
  isOrderPopupOpen: boolean;
  activeOrder: TOrder | undefined;
  orders: TOrder[] | undefined;
  ordersLoading: boolean;
}

export const initialState: IOrderState = {
  orderDetails: {
    name: "",
    order: {
      number: -1,
    },
    success: false,
  },
  activeOrder: undefined,
  orderDetailsLoading: false,
  orderDetailsError: false,
  isOrderPopupOpen: false,
  orders: undefined,
  ordersLoading: false,
};

export const postOrderThunk = createAsyncThunk<
  TPostOrderOutput,
  string[],
  { state: RootState; dispatch: AppDispatch }
>("order/postOrder", (ingredients, thunkAPI) => {
  const token = thunkAPI.getState().user.accessToken;
  return postOrder({ ingredients }, token);
});
export const fetchOrdersThunk = createAsyncThunk<
  void,
  void,
  { state: RootState; dispatch: AppDispatch }
>("order/fetchOrders", async (_, thunkAPI) => {
  const token = thunkAPI.getState().user.accessToken;
  const orders = await fetchOrders(token);
  thunkAPI.dispatch(updateOrders(orders.orders));
});

export const order = createSlice({
  name: "order",
  initialState,
  reducers: {
    openOrderPopup: (state) => {
      state.isOrderPopupOpen = true;
    },
    closeOrderPopup: (state) => {
      state.isOrderPopupOpen = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrderThunk.pending, (state) => {
      state.orderDetailsLoading = true;
    });
    builder.addCase(postOrderThunk.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
      state.orderDetailsLoading = false;
      state.orderDetailsError = false;
    });
    builder.addCase(postOrderThunk.rejected, (state) => {
      state.orderDetailsError = true;
    });
  },
});

export const selectOrderDetails = (state: RootState) => {
  return state.order.orderDetails;
};
export const selectOrderLoading = (state: RootState) => {
  return state.order.orderDetailsLoading;
};
export const selectIsOrderPopupOpen = (state: RootState) => {
  return state.order.isOrderPopupOpen;
};

const { actions, reducer } = order;

export const { openOrderPopup, closeOrderPopup } = actions;

export default reducer;
