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
  closeOrderPopup,
  fetchOrder,
  openOrderPopup,
  selectBun,
  selectIsOrderPopupOpen,
  selectMains,
  selectOrderDetails,
  selectOrderLoading,
  selectPrice,
} from "../../services/ingredientsSlice";
import styles from "./burger-constructor.module.css";

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
    dispatch(fetchOrder()).then(() => dispatch(openOrderPopup()));
  };

  const onClose = () => dispatch(closeOrderPopup());

  return (
    <section className={cn(styles.root, "ml-10")}>
      {bun && <Ingredient bun position="top" {...bun} />}
      <ul className={cn(styles.list, "custom-scroll")}>
        {mains.map((item, idx) => (
          <li className={styles.item} key={`${item._id}-${idx}`}>
            <Ingredient {...item} />
          </li>
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
