import React from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import styles from "./app.module.css";

const App = () => {
  return (
    <>
      <AppHeader/>
      <div className={styles.burgerContainer}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </div>
    </>
  );
};

export default App;
