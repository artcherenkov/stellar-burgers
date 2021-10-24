import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../../components/app-header/app-header";
import styles from "../../components/app/app.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  closeDetailsPopup,
  fetchIngredients,
  resetActiveIngredient,
  selectActiveIngredient,
  selectIsDetailsPopupOpen,
} from "../../services/slices/ingredients";

export const ANIMATION_DURATION = 300; // мс

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeIngredient = useAppSelector(selectActiveIngredient);
  const isDetailsPopupOpen = useAppSelector(selectIsDetailsPopupOpen);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const onModalClose = () => {
    dispatch(closeDetailsPopup());
    setTimeout(() => dispatch(resetActiveIngredient()), ANIMATION_DURATION);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.root}>
        <AppHeader />
        <div className={styles.burgerContainer}>
          <BurgerIngredients />
          <BurgerConstructor />
          <Modal open={isDetailsPopupOpen} onClose={onModalClose}>
            {activeIngredient && (
              <IngredientDetails ingredient={activeIngredient} />
            )}
          </Modal>
        </div>
      </div>
    </DndProvider>
  );
};

export default Main;
