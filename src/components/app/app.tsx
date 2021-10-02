import React, { useEffect, useReducer } from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./app.module.css";
import {
  ActionType,
  IAction,
  IConstructorState,
  IngredientType,
  TIngredient,
  TIngredientWithCount,
} from "./app.typed";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  closeDetailsPopup,
  fetchIngredients,
  resetActiveIngredient,
  selectActiveIngredient,
  selectIngredients,
  selectIsDetailsPopupOpen,
} from "../../services/ingredientsSlice";

const ErrorMessage = {
  BUN_REQUIRED: "В качестве булки нельзя добавлять другие ингредиенты.",
  BUN_FORBIDDEN: "Булку нельзя добавить в качестве главного ингредиента.",
  UNDEFINED_INGREDIENT: "Ингредиента с указанным id не существует",
};
export const ANIMATION_DURATION = 300; // мс

const getIngredientById = (arr: TIngredient[], id: string) => {
  const result = arr.find((i) => i._id === id);

  if (!result) {
    throw new Error(ErrorMessage.UNDEFINED_INGREDIENT);
  }

  return result;
};

const countPrice = (ingredients: TIngredientWithCount[]) =>
  ingredients.reduce((acc, item) => acc + item.price * item.count, 0);

const initialState: IConstructorState = { bun: null, mains: [], price: 0 };

const reducer = (state: IConstructorState, action: IAction) => {
  switch (action.type) {
    case ActionType.ADD_BUN: {
      const newBun: TIngredientWithCount = { ...action.payload, count: 2 };

      if (newBun.type !== IngredientType.BUN) {
        throw new Error(ErrorMessage.BUN_REQUIRED);
      }

      const newPrice = countPrice([...state.mains, newBun]);

      return {
        ...state,
        bun: newBun,
        price: newPrice,
      };
    }
    case ActionType.ADD_INGREDIENT: {
      const newIngredient: TIngredient = action.payload;

      if (newIngredient.type === IngredientType.BUN) {
        throw new Error(ErrorMessage.BUN_FORBIDDEN);
      }

      let mains = [...state.mains];
      const existingIngredientIndex = state.mains.findIndex(
        (i) => i._id === newIngredient._id
      );
      if (existingIngredientIndex !== -1) {
        const existingIngredient = mains[existingIngredientIndex];
        const count = existingIngredient.count + 1;
        mains[existingIngredientIndex] = { ...existingIngredient, count };
      } else {
        mains = [...state.mains, { ...newIngredient, count: 1 }];
      }

      const price = state.bun
        ? countPrice([state.bun, ...mains])
        : countPrice(mains);

      return { ...state, mains, price };
    }
    case ActionType.DELETE_INGREDIENT: {
      const ingredientId: string = action.payload;
      const mains = state.mains.filter((i) => i._id !== ingredientId);
      const price = state.bun
        ? countPrice([state.bun, ...mains])
        : countPrice(mains);
      return { ...state, mains, price };
    }
    default:
      throw new Error();
  }
};

const App = () => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectIngredients);
  const activeIngredient = useAppSelector(selectActiveIngredient);
  const isDetailsPopupOpen = useAppSelector(selectIsDetailsPopupOpen);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const [constructorState, constructorDispatch] = useReducer(
    reducer,
    initialState
  );

  const onModalClose = () => {
    dispatch(closeDetailsPopup());
    setTimeout(() => dispatch(resetActiveIngredient()), ANIMATION_DURATION);
  };

  const onIngredientClick = (ingredientId: string) => {
    const ingredient = getIngredientById(ingredients, ingredientId);
    if (ingredient.type === IngredientType.BUN) {
      constructorDispatch({ type: ActionType.ADD_BUN, payload: ingredient });
    } else {
      constructorDispatch({
        type: ActionType.ADD_INGREDIENT,
        payload: ingredient,
      });
    }
  };

  const onDeleteIngredientClick = (ingredientId: string) => {
    constructorDispatch({
      type: ActionType.DELETE_INGREDIENT,
      payload: ingredientId,
    });
  };

  if (!ingredients.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.root}>
      <AppHeader />
      <div className={styles.burgerContainer}>
        <BurgerIngredients onIngredientClick={onIngredientClick} />
        <BurgerConstructor
          constructorState={constructorState}
          onDeleteClick={onDeleteIngredientClick}
        />
        <Modal open={isDetailsPopupOpen} onClose={onModalClose}>
          {activeIngredient && (
            <IngredientDetails ingredient={activeIngredient} />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default App;
