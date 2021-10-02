import cn from "classnames";
import React from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Ingredient from "./components/ingredient/ingredient";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  selectBun,
  selectMains,
  selectPrice,
} from "../../services/slices/ingredients";
import styles from "./burger-constructor.module.css";
import {
  fetchOrder,
  openOrderPopup,
  closeOrderPopup,
  selectIsOrderPopupOpen,
  selectOrderDetails,
  selectOrderLoading,
} from "../../services/slices/order";

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();

  const bun = useAppSelector(selectBun);
  const mains = useAppSelector(selectMains);
  const price = useAppSelector(selectPrice);
  const orderDetails = useAppSelector(selectOrderDetails);
  const orderLoading = useAppSelector(selectOrderLoading);
  const isOrderPopupOpen = useAppSelector(selectIsOrderPopupOpen);

  const onOrderSubmit = () => {
    if (!bun || orderLoading) return;
    const ingredientsIds = [bun, ...mains].map((ingredient) => ingredient._id);
    dispatch(fetchOrder(ingredientsIds)).then(() => dispatch(openOrderPopup()));
  };

  const onClose = () => dispatch(closeOrderPopup());

  return (
    <section className={cn(styles.root, "ml-10")}>
      {bun && <Ingredient bun position="top" {...bun} />}
      <ul className={cn(styles.list, "custom-scroll")}>
        {mains.map((item) => (
          <Ingredient {...item} key={item._id} />
        ))}
      </ul>
      {bun && <Ingredient bun position="bottom" {...bun} />}

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
