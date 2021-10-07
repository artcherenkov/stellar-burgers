import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredients";
import orderReducer from "./slices/order";

export const store = configureStore({
  reducer: { ingredients: ingredientsReducer, order: orderReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
