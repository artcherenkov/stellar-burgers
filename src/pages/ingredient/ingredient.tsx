import React, { useEffect, useMemo, useState } from "react";
import AppHeader from "../../components/app-header/app-header";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  openDetailsPopup,
  selectActiveIngredient,
  selectIsDetailsPopupOpen,
  closeDetailsPopup,
  resetActiveIngredient,
  selectIngredients,
  fetchIngredients,
  setActiveIngredient,
  selectIngredientsLoading,
} from "../../services/slices/ingredients";
import Modal from "../../components/modal/modal";
import { ANIMATION_DURATION } from "../main/main";

const MOCK_INGREDIENT = {
  _id: "60d3b41abdacab0026a733c6",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

const CONTAINER_STYLE = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 120,
};

const Ingredient: React.FC = () => {
  const dispatch = useAppDispatch();

  const activeIngredient = useAppSelector(selectActiveIngredient);
  const isDetailsPopupOpen = useAppSelector(selectIsDetailsPopupOpen);
  const ingredients = useAppSelector(selectIngredients);
  const ingredientsLoading = useAppSelector(selectIngredientsLoading);

  const params = useParams<{ id?: string }>();
  const history = useHistory<{ showPopup?: boolean }>();

  const [showPopup, setShowPopup] = useState(history.location.state?.showPopup);

  const ingredientId = useMemo(() => params.id, [params]);

  const shouldOpenPopup = useMemo(
    () => showPopup && ingredientId && ingredients.length,
    [ingredients, ingredientId, showPopup]
  );

  const onModalClose = () => {
    dispatch(closeDetailsPopup());
    setShowPopup(false);
  };

  useEffect(() => {
    // загрузить ингредиенты, если их нет
    if (!ingredients.length) {
      dispatch(fetchIngredients());
      return;
    }

    dispatch(setActiveIngredient(ingredientId!));

    // открыть попап
    if (shouldOpenPopup) {
      dispatch(openDetailsPopup());
    }
  }, [ingredients, ingredientId, shouldOpenPopup, activeIngredient]);

  if (!ingredients.length || ingredientsLoading) {
    return (
      <>
        <AppHeader />
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      </>
    );
  }

  return (
    <>
      <AppHeader />
      {!shouldOpenPopup && (
        <div style={CONTAINER_STYLE}>
          {activeIngredient && (
            <IngredientDetails ingredient={activeIngredient} />
          )}
        </div>
      )}

      <Modal open={isDetailsPopupOpen} onClose={onModalClose}>
        {activeIngredient && (
          <IngredientDetails ingredient={activeIngredient} />
        )}
      </Modal>
    </>
  );
};

export default Ingredient;
