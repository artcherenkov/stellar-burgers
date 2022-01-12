import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "../../components/app/app.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Layout from "../../components/layout/layout";

const Main: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout className={styles.root}>
        <div className={styles.burgerContainer}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </Layout>
    </DndProvider>
  );
};

export default Main;
