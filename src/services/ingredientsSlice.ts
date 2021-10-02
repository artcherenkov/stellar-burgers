import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType, TIngredient } from "../components/app/app.typed";
import { getIngredients, postOrder } from "../utils/api";
import { AppDispatch, RootState } from "./store";

/** Тип ответа сервера при запросе ингредиентов. */
type TIngredientResponse = PayloadAction<{
  data: TIngredient[];
  success: boolean;
}>;
type TOrderDetails = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};
type TIdWithQty = { id: string; qty: number };

interface IIngredientsState {
  ingredients: TIngredient[];
  ingredientsLoading: boolean;
  ingredientsError: boolean;

  isDetailsPopupOpen: boolean;
  activeIngredientId: string;

  constructor: {
    bun: null | TIdWithQty;
    mains: TIdWithQty[];
    price: number;
  };

  orderDetails: TOrderDetails;
  orderDetailsLoading: boolean;
  orderDetailsError: boolean;
  isOrderPopupOpen: boolean;
}

const initialState: IIngredientsState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: false,

  isDetailsPopupOpen: false,
  activeIngredientId: "",

  constructor: {
    bun: null,
    mains: [],
    price: 0,
  },

  orderDetails: {
    name: "",
    order: {
      number: -1,
    },
    success: false,
  },
  orderDetailsLoading: false,
  orderDetailsError: false,
  isOrderPopupOpen: false,
};

const countPrice = (state: IIngredientsState) => {
  const ingredientsToCount = [...state.constructor.mains];
  if (state.constructor.bun) {
    ingredientsToCount.push(state.constructor.bun);
  }

  return ingredientsToCount.reduce((acc, item) => {
    const ingredient = state.ingredients.find((i) => i._id === item.id);
    if (!ingredient) return acc;
    return acc + ingredient.price * item.qty;
  }, 0);
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  getIngredients
);
export const fetchOrder = createAsyncThunk<
  TOrderDetails,
  void,
  { state: RootState; dispatch: AppDispatch }
>("ingredients/postOrder", (_never, thunkApi) => {
  const state = thunkApi.getState();
  const ingredients = [...state.constructor.mains];
  if (state.constructor.bun) {
    ingredients.push(state.constructor.bun);
  }

  return postOrder({ ingredients: ingredients.map((ing) => ing.id) });
});
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

    // взаимодействие с конструктором
    addIngredient: (state, action: PayloadAction<string>) => {
      const ingredient = state.ingredients.find(
        (i) => i._id === action.payload
      );
      if (!ingredient) return;

      if (ingredient.type === IngredientType.BUN) {
        state.constructor.bun = { id: action.payload, qty: 2 };
        state.constructor.price = countPrice(state);

        return;
      }

      const existingIngredientIndex = state.constructor.mains.findIndex(
        (i) => i.id === action.payload
      );
      if (existingIngredientIndex !== -1) {
        // если ингредиент найден в конструкторе, увеличим его qty
        state.constructor.mains = state.constructor.mains.map((i) =>
          i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        // иначе добавим ингредиент
        state.constructor.mains.push({ id: action.payload, qty: 1 });
      }

      state.constructor.price = countPrice(state);
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      const ingredient = state.ingredients.find(
        (i) => i._id === action.payload
      );
      if (!ingredient || ingredient.type === IngredientType.BUN) return;

      state.constructor.mains = state.constructor.mains.filter(
        (main) => main.id !== action.payload
      );
      state.constructor.price = countPrice(state);
    },
    openOrderPopup: (state) => {
      state.isOrderPopupOpen = true;
    },
    closeOrderPopup: (state) => {
      state.isOrderPopupOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.ingredientsLoading = true;
    });
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: TIngredientResponse) => {
        const { data } = action.payload;
        state.ingredients = data;
        state.ingredientsLoading = false;
        state.ingredientsError = false;
      }
    );
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.ingredientsError = true;
    });

    builder.addCase(fetchOrder.pending, (state) => {
      state.orderDetailsLoading = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
      state.orderDetailsLoading = false;
      state.orderDetailsError = false;
    });
    builder.addCase(fetchOrder.rejected, (state) => {
      state.ingredientsError = true;
    });
  },
});

export const selectIngredients = (state: RootState) => state.ingredients;

export const selectActiveIngredient = (state: RootState) =>
  state.ingredients.find((i) => i._id === state.activeIngredientId);

export const selectIsDetailsPopupOpen = (state: RootState) =>
  state.isDetailsPopupOpen;

export const selectBun = (state: RootState) => {
  const bun = state.ingredients.find(
    (i) => i._id === state.constructor.bun?.id
  );
  if (!bun) return null;

  return { ...bun, count: 2 };
};

export const selectMains = (state: RootState) =>
  state.constructor.mains.map((main) => {
    const foundIngredient = state.ingredients.find(
      (ingredient) => ingredient._id === main.id
    )!;
    return { ...foundIngredient, count: main.qty };
  });

export const selectPrice = (state: RootState) => state.constructor.price;

export const selectOrderDetails = (state: RootState) => state.orderDetails;
export const selectOrderLoading = (state: RootState) =>
  state.orderDetailsLoading;
export const selectIsOrderPopupOpen = (state: RootState) =>
  state.isOrderPopupOpen;

const { actions, reducer } = ingredientsSlice;

export const {
  closeDetailsPopup,
  openDetailsPopup,
  resetActiveIngredient,
  addIngredient,
  deleteIngredient,
  openOrderPopup,
  closeOrderPopup,
} = actions;

export default reducer;
