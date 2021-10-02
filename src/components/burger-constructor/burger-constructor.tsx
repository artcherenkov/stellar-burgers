import cn from "classnames";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Ingredient from "./components/ingredient/ingredient";
import React, { useCallback } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  closeOrderPopup,
  deleteIngredient,
  fetchOrder,
  openDetailsPopup,
  openOrderPopup,
  selectBun,
  selectIsOrderPopupOpen,
  selectMains,
  selectOrderDetails,
  selectOrderLoading,
  selectPrice,
} from "../../services/ingredientsSlice";

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();

  const bun = useAppSelector(selectBun);
  const mains = useAppSelector(selectMains);
  const price = useAppSelector(selectPrice);
  const orderDetails = useAppSelector(selectOrderDetails);
  const orderLoading = useAppSelector(selectOrderLoading);
  const isOrderPopupOpen = useAppSelector(selectIsOrderPopupOpen);

  const onOrderSubmit = () => {
    dispatch(fetchOrder()).then(() => dispatch(openOrderPopup()));
  };

  const onClose = () => dispatch(closeOrderPopup());

  const onIngredientClick = useCallback(
    (id: string | undefined) => {
      if (!id) return;
      dispatch(openDetailsPopup(id));
    },
    [dispatch]
  );

  const onDeleteClick = useCallback(
    (id: string) => {
      dispatch(deleteIngredient(id));
    },
    [dispatch]
  );

  return (
    <section className={cn(styles.root, "ml-10")}>
      {bun && (
        <div
          className={cn(
            styles.ingredientContainer,
            styles.ingredientContainer_outter
          )}
          onClick={() => onIngredientClick(bun?._id)}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <ul className={cn(styles.list, "custom-scroll")}>
        {mains.map((item, idx) => (
          <li className={styles.item} key={`${item._id}-${idx}`}>
            <Ingredient
              {...item}
              onDeleteClick={() => onDeleteClick(item._id)}
              onClick={() => onIngredientClick(item._id)}
            />
          </li>
        ))}
      </ul>
      {bun && (
        <div
          className={cn(
            styles.ingredientContainer,
            styles.ingredientContainer_outter
          )}
          onClick={() => onIngredientClick(bun?._id)}
        >
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      <div className={cn(styles.results, "mt-10")}>
        <p className={cn(styles.totalCost, "mr-10")}>
          <span className="text text_type_digits-medium mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large" onClick={onOrderSubmit}>
          {orderLoading ? "Загрузка..." : "Оформить заказ"}
        </Button>
      </div>

      <Modal open={isOrderPopupOpen} onClose={onClose}>
        <OrderDetails {...orderDetails} />
      </Modal>
    </section>
  );
};

export default BurgerConstructor;
