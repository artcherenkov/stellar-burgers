import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../../components/app-header/app-header";
import styles from "../../components/app/app.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { useAppDispatch } from "../../services/hooks";
import { fetchIngredients } from "../../services/slices/ingredients";

export const ANIMATION_DURATION = 300; // мс

const Main: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.root}>
        <AppHeader />
        <div className={styles.burgerContainer}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </div>
    </DndProvider>
  );
};

export default Main;
