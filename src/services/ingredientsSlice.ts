import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "../components/app/app.typed";
import { getIngredients } from "../utils/api";
import { RootState } from "./store";

interface IIngredientsState {
  ingredients: TIngredient[];
  ingredientsLoading: boolean;
  ingredientsError: boolean;

  isDetailsPopupOpen: boolean;
  activeIngredientId: string;
}

type TResponse = PayloadAction<{ data: TIngredient[]; success: boolean }>;

const initialState: IIngredientsState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: false,

  isDetailsPopupOpen: false,
  activeIngredientId: "",
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  getIngredients
);
export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    // взаимодействие с попапом
    openDetailsPopup: (state, action: PayloadAction<string>) => {
      state.isDetailsPopupOpen = true;
      state.activeIngredientId = action.payload;
    },
    resetActiveIngredient: (state) => {
      state.activeIngredientId = "";
    },
    closeDetailsPopup: (state) => {
      state.isDetailsPopupOpen = false;
    },
  },
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

export const selectIngredients = (state: RootState) => state.ingredients;
export const selectActiveIngredient = (state: RootState) =>
  state.ingredients.find((i) => i._id === state.activeIngredientId);
export const selectIsDetailsPopupOpen = (state: RootState) =>
  state.isDetailsPopupOpen;

const { actions, reducer } = ingredientsSlice;

export const { closeDetailsPopup, openDetailsPopup, resetActiveIngredient } =
  actions;

export default reducer;
