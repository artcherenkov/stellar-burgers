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

const API_URL = "https://norma.nomoreparties.space/api/ingredients";
export const Type = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};

const getIngredientById = (arr: TIngredient[], id: string | null) =>
  id && arr.find((i) => i._id === id);

const sortIngredientsByType = (data: TIngredient[]) => {
  const buns = data.filter((i) => i.type === Type.BUN);
  const mains = data.filter((i) => i.type === Type.MAIN);
  const sauces = data.filter((i) => i.type === Type.SAUCE);
  return { buns, mains, sauces };
};

// временное решение для нахождения данных для конструктора
const getBun = (data: TIngredient[]) => data.find((d) => d.type === Type.BUN);
const getMainsAndSauces = (data: TIngredient[]) =>
  data.filter((d) => d.type !== Type.BUN);

const App = () => {
  const [data, setData] = useState<null | TIngredient[]>(null);
  const [sortedIngredients, setSortedIngredients] =
    useState<null | { [key: string]: TIngredient[] }>(null);

  useEffect(() => {
    fetch(API_URL)
      .then(getResponseData)
      .then(({ data }) => {
        setData(data);
        setSortedIngredients(sortIngredientsByType(data));
      })
      .catch((err) => console.log(err));
  }, []);

  const [detailsPopupOpen, setDetailsPopupOpen] = useState(false);
  const [activeIngredientId, setActiveIngredientId] =
    useState<null | string>(null);

  const [orderPopupOpen, setOrderPopupOpen] = useState(false);
  const handleOrderPopupClose = () => setOrderPopupOpen(false);
  const handleOrderPopupOpen = () => setOrderPopupOpen(true);

  const onModalClose = () => {
    setDetailsPopupOpen(false);
    setTimeout(() => setActiveIngredientId(null), 300);
  };

  if (!data || !sortedIngredients) {
    return <p>Loading...</p>;
  }

  const onIngredientClick = (ingredientId: string) => {
    setDetailsPopupOpen(true);
    setActiveIngredientId(ingredientId);
  };

  const activeIngredient = getIngredientById(data, activeIngredientId);

  // временное решение для заполнения конструктора
  const bun = getBun(data)!;
  const mainsAndSauces = getMainsAndSauces(data);

  return (
    <div className={styles.root}>
      <AppHeader />
      <div className={styles.burgerContainer}>
        <BurgerIngredients
          ingredients={sortedIngredients}
          onIngredientClick={onIngredientClick}
        />
        <BurgerConstructor
          bun={bun}
          main={mainsAndSauces}
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
  );
};

export default App;
