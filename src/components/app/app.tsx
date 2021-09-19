import React, { useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import styles from "./app.module.css";
import Modal from "../modal/modal";

const App = () => {
  const [open, setOpen] = useState(false);
  const onModalClose = () => setOpen(false);

  return (
    <div className={styles.root}>
      <AppHeader />
      <div className={styles.burgerContainer}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
      <Modal open={open} onClose={onModalClose} />
    </div>
  );
};

export default App;
