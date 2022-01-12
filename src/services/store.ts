import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredients";
import orderReducer from "./slices/order";
import userReducer from "./slices/user";
import wsOrderReducer, { WS_ORDER_ACTIONS } from "./slices/ws-orders";
import { socketMiddleware } from "../middleware/socket-middleware";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    user: userReducer,
    wsOrders: wsOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(
        "wss://norma.nomoreparties.space/orders/all",
        WS_ORDER_ACTIONS
      )
    ),
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
