import React from "react";
import cn from "classnames";
import iconAccepted from "../../images/icon-accepted.svg";

import styles from "./order-details.module.css";

const OrderDetails = () => {
  return (
    <>
      <div className={styles.root}>
        <h1 className={cn("text text_type_digits-large pt-20 pb-8")}>034536</h1>
        <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
        <img className="pb-15" src={iconAccepted} alt="Иконка успеха" />
        <p className="text text_type_main-default pb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default pb-15 text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
};

export default OrderDetails;
