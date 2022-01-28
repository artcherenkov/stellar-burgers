import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType, TIngredient } from "../../components/app/app.typed";
import { getIngredients } from "../../utils/api";
import { RootState } from "../store";

type TIdWithQty = { id: string; qty: number };

interface IIngredientsState {
  // ingredients
  ingredients: TIngredient[];
  ingredientsLoading: boolean;
  ingredientsError: boolean;
  activeIngredientId: string;
  isDetailsPopupOpen: boolean;

  // constructor
  constructor: {
    bun: null | TIdWithQty;
    mains: TIdWithQty[];
    price: number;
  };
  dragging: string;
}

export const initialConstructorState = {
  bun: null,
  mains: [],
  price: 0,
};
export const initialState: IIngredientsState = {
  // ingredients
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: false,
  activeIngredientId: "",
  isDetailsPopupOpen: false,

  // constructor
  constructor: initialConstructorState,
  dragging: "",
};

export const countPrice = (state: IIngredientsState) => {
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

export const ingredients = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    // взаимодействие с попапом ингредиента
    openDetailsPopup: (state) => {
      state.isDetailsPopupOpen = true;
    },
    setActiveIngredient: (state, action: PayloadAction<string>) => {
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

      const deletingIngredientIndex = state.constructor.mains.findIndex(
        (i) => i.id === action.payload
      );
      if (deletingIngredientIndex === -1) return;

      const deletingIngredient =
        state.constructor.mains[deletingIngredientIndex];
      if (deletingIngredient.qty > 1) {
        deletingIngredient.qty -= 1;
      } else {
        state.constructor.mains = state.constructor.mains.filter(
          (i) => i.id !== action.payload
        );
      }

      state.constructor.price = countPrice(state);
    },
    setDragging: (state, action: PayloadAction<string>) => {
      state.dragging = action.payload;
    },
    swapIngredients: (state, action: PayloadAction<string>) => {
      const { mains } = state.constructor;

      const draggingIndex = mains.findIndex((ing) => ing.id === state.dragging);
      const hoveredIndex = mains.findIndex((ing) => ing.id === action.payload);

      if (draggingIndex > hoveredIndex) {
        const temp = mains[hoveredIndex];
        mains[hoveredIndex] = mains[draggingIndex];
        mains[draggingIndex] = temp;
      } else if (draggingIndex < hoveredIndex) {
        const temp = mains[draggingIndex];
        mains[draggingIndex] = mains[hoveredIndex];
        mains[hoveredIndex] = temp;
      }
    },
    clearConstructor: (state) => {
      state.constructor = initialConstructorState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.ingredientsLoading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.data;
      state.ingredientsLoading = false;
      state.ingredientsError = false;
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.ingredientsError = true;
    });
  },
});

export const selectIngredients = (state: RootState) => {
  return state.ingredients.ingredients;
};
export const selectActiveIngredient = (state: RootState) => {
  return state.ingredients.ingredients.find(
    (i) => i._id === state.ingredients.activeIngredientId
  );
};
export const selectBun = (state: RootState) => {
  const bun = state.ingredients.ingredients.find(
    (i) => i._id === state.ingredients.constructor.bun?.id
  );
  if (!bun) return null;

  return { ...bun, count: 2 };
};
export const selectMains = (state: RootState) => {
  return state.ingredients.constructor.mains.map((main) => {
    const foundIngredient = state.ingredients.ingredients.find(
      (ingredient) => ingredient._id === main.id
    )!;
    return { ...foundIngredient, count: main.qty };
  });
};
export const selectPrice = (state: RootState) => {
  return state.ingredients.constructor.price;
};
export const selectIngredientQty = (id: string) => (state: RootState) => {
  const ingredient = state.ingredients.ingredients.find((i) => i._id === id);
  if (!ingredient) return 0;

  if (ingredient.type === IngredientType.BUN) {
    const bun = state.ingredients.constructor.bun;
    return bun && bun.id === id ? bun.qty : 0;
  }

  const main = state.ingredients.constructor.mains.find((i) => i.id === id);
  return main ? main.qty : 0;
};
export const selectIngredientsLoading = (state: RootState) => {
  return state.ingredients.ingredientsLoading;
};
export const selectIngredientById = (id: string) => (state: RootState) => {
  return state.ingredients.ingredients.find((ing) => ing._id === id);
};

const { actions, reducer } = ingredients;

export const {
  closeDetailsPopup,
  openDetailsPopup,
  resetActiveIngredient,
  addIngredient,
  deleteIngredient,
  setDragging,
  swapIngredients,
  setActiveIngredient,
  clearConstructor,
} = actions;

export default reducer;
