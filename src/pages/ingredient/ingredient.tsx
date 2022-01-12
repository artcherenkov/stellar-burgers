import React from "react";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useAppSelector } from "../../services/hooks";
import {
  selectIngredients,
  selectIngredientsLoading,
} from "../../services/slices/ingredients";
import Layout from "../../components/layout/layout";

const CONTAINER_STYLE = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 120,
};

const Ingredient: React.FC = () => {
  const ingredients = useAppSelector(selectIngredients);
  const ingredientsLoading = useAppSelector(selectIngredientsLoading);

  if (!ingredients.length || ingredientsLoading) {
    return (
      <Layout>
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={CONTAINER_STYLE}>
        <IngredientDetails />
      </div>
    </Layout>
  );
};

export default Ingredient;
