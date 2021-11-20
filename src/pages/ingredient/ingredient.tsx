import React from "react";
import AppHeader from "../../components/app-header/app-header";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

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
  return (
    <>
      <AppHeader />
      <div style={CONTAINER_STYLE}>
        <IngredientDetails ingredient={MOCK_INGREDIENT} />
      </div>
    </>
  );
};

export default Ingredient;
