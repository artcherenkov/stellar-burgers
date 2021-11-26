import React, { useEffect, useMemo, useState } from "react";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  openDetailsPopup,
  selectActiveIngredient,
  selectIsDetailsPopupOpen,
  closeDetailsPopup,
  selectIngredients,
  fetchIngredients,
  setActiveIngredient,
  selectIngredientsLoading,
} from "../../services/slices/ingredients";
import Modal from "../../components/modal/modal";
import Layout from "../../components/layout/layout";

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
      <Layout>
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
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
    </Layout>
  );
};

export default Ingredient;
