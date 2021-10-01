import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "../components/app/app.typed";
import { getIngredients } from "../utils/api";

interface IIngredientsState {
  ingredients: TIngredient[];
  ingredientsLoading: boolean;
  ingredientsError: boolean;
}

type TResponse = PayloadAction<{ data: TIngredient[]; success: boolean }>;

const initialState: IIngredientsState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: false,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  getIngredients
);
export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.ingredientsLoading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action: TResponse) => {
      const { data } = action.payload;
      state.ingredients = data;
      state.ingredientsLoading = false;
      state.ingredientsError = false;
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.ingredientsError = true;
    });
  },
});

const { reducer } = ingredientsSlice;

export default reducer;
