import React from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImage from "../../../../components/feed-card/components/ingredient-image/ingredient-image";
import styles from "./order.module.css";
import * as H from "history";

const Order = () => {
  const location = useLocation<{ background?: H.Location }>();

  return (
    <li className={styles.orderContainer}>
      <Link
        className={styles.order}
        to={{
          pathname: `orders/1`,
          state: { background: location },
        }}
      >
        <p className={styles.header}>
          <span className="text text_type_digits-default">#034534</span>
          <time className="text text_type_main-default text_color_inactive">
            Сегодня, 13:20 i-GMT+3
          </time>
        </p>
        <p className="text text_type_main-medium mb-2">
          Death Star Starship Main бургер
        </p>
        <p className="text text_type_main-default mb-6">Создан</p>

        <div className={styles.ingredientsContainer}>
          <ul className={styles.ingredientsList}>
            <IngredientImage src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
            <IngredientImage src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
            <IngredientImage src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
            <IngredientImage src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
          </ul>
          <p className={cn(styles.priceContainer)}>
            <span className="text text_type_digits-default mr-2">480</span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Order;
