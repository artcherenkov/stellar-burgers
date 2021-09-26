import React, { useEffect, useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients, {
  TIngredient,
} from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./app.module.css";
import OrderDetails from "../order-details/order-details";
import { getResponseData } from "../../utils/api";
import IngredientsContext from "../../context/IngredientsContext";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";
export const Type = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};

const getIngredientById = (arr: TIngredient[], id: string | null) =>
  id && arr.find((i) => i._id === id);

const App = () => {
  const [data, setData] = useState<TIngredient[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then(getResponseData)
      .then(({ data }) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const [detailsPopupOpen, setDetailsPopupOpen] = useState(false);
  const [activeIngredientId, setActiveIngredientId] = useState<null | string>(
    null
  );

  const [orderPopupOpen, setOrderPopupOpen] = useState(false);
  const handleOrderPopupClose = () => setOrderPopupOpen(false);
  const handleOrderPopupOpen = () => setOrderPopupOpen(true);

  const onModalClose = () => {
    setDetailsPopupOpen(false);
    setTimeout(() => setActiveIngredientId(null), 300);
  };

  const onIngredientClick = (ingredientId: string) => {
    setDetailsPopupOpen(true);
    setActiveIngredientId(ingredientId);
  };

  if (!data.length) {
    return <p>Loading...</p>;
  }

  const activeIngredient = getIngredientById(data, activeIngredientId);

  return (
    <IngredientsContext.Provider value={data}>
      <div className={styles.root}>
        <AppHeader />
        <div className={styles.burgerContainer}>
          <BurgerIngredients onIngredientClick={onIngredientClick} />
          <BurgerConstructor
            onIngredientClick={onIngredientClick}
            openPopup={handleOrderPopupOpen}
          />
          <Modal open={detailsPopupOpen} onClose={onModalClose}>
            {activeIngredient && (
              <IngredientDetails ingredient={activeIngredient} />
            )}
          </Modal>
          <Modal open={orderPopupOpen} onClose={handleOrderPopupClose}>
            <OrderDetails />
          </Modal>
        </div>
      </div>
    </IngredientsContext.Provider>
  );
};

export default App;
