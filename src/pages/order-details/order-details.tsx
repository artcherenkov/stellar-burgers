import React from "react";
import cn from "classnames";
import styles from "./order-details.module.css";
import IngredientImage from "../../components/feed-card/components/ingredient-image/ingredient-image";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div style={style} className={styles.root}>
      <p
        className="text text_type_digits-default mb-10"
        style={{ textAlign: "center" }}
      >
        #034533
      </p>
      <h1 className="text text_type_main-medium mb-3">
        Black Hole Singularity острый бургер
      </h1>
      <p className="text text_type_main-default mb-15">Выполнен</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={cn(styles.list, "custom-scroll mb-10")}>
        <li className={styles.ingredient}>
          <IngredientImage
            style={{ margin: 0 }}
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            renderDiv
          />
          <p
            className={cn(
              styles.title,
              "text text_type_main-default ml-4 mr-4"
            )}
          >
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.priceContainer}>
            <span className="text text_type_main-default mr-2">2 x 20</span>{" "}
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={styles.ingredient}>
          <IngredientImage
            style={{ margin: 0 }}
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            renderDiv
          />
          <p
            className={cn(
              styles.title,
              "text text_type_main-default ml-4 mr-4"
            )}
          >
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.priceContainer}>
            <span className="text text_type_main-default mr-2">2 x 20</span>{" "}
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={styles.ingredient}>
          <IngredientImage
            style={{ margin: 0 }}
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            renderDiv
          />
          <p
            className={cn(
              styles.title,
              "text text_type_main-default ml-4 mr-4"
            )}
          >
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.priceContainer}>
            <span className="text text_type_main-default mr-2">2 x 20</span>{" "}
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={styles.ingredient}>
          <IngredientImage
            style={{ margin: 0 }}
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            renderDiv
          />
          <p
            className={cn(
              styles.title,
              "text text_type_main-default ml-4 mr-4"
            )}
          >
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.priceContainer}>
            <span className="text text_type_main-default mr-2">2 x 20</span>{" "}
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={styles.ingredient}>
          <IngredientImage
            style={{ margin: 0 }}
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            renderDiv
          />
          <p
            className={cn(
              styles.title,
              "text text_type_main-default ml-4 mr-4"
            )}
          >
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.priceContainer}>
            <span className="text text_type_main-default mr-2">2 x 20</span>{" "}
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={styles.ingredient}>
          <IngredientImage
            style={{ margin: 0 }}
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            renderDiv
          />
          <p
            className={cn(
              styles.title,
              "text text_type_main-default ml-4 mr-4"
            )}
          >
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.priceContainer}>
            <span className="text text_type_main-default mr-2">2 x 20</span>{" "}
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={styles.ingredient}>
          <IngredientImage
            style={{ margin: 0 }}
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            renderDiv
          />
          <p
            className={cn(
              styles.title,
              "text text_type_main-default ml-4 mr-4"
            )}
          >
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.priceContainer}>
            <span className="text text_type_main-default mr-2">2 x 20</span>{" "}
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={styles.ingredient}>
          <IngredientImage
            style={{ margin: 0 }}
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            renderDiv
          />
          <p
            className={cn(
              styles.title,
              "text text_type_main-default ml-4 mr-4"
            )}
          >
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.priceContainer}>
            <span className="text text_type_main-default mr-2">2 x 20</span>{" "}
            <CurrencyIcon type="primary" />
          </p>
        </li>
        <li className={styles.ingredient}>
          <IngredientImage
            style={{ margin: 0 }}
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            renderDiv
          />
          <p
            className={cn(
              styles.title,
              "text text_type_main-default ml-4 mr-4"
            )}
          >
            Флюоресцентная булка R2-D3
          </p>
          <p className={styles.priceContainer}>
            <span className="text text_type_main-default mr-2">2 x 20</span>{" "}
            <CurrencyIcon type="primary" />
          </p>
        </li>
      </ul>
      <p className={styles.info}>
        <time className="text text_type_main-default text_color_inactive">
          Вчера, 13:50 i-GMT+3
        </time>
        <p style={{ marginLeft: "auto" }} className={styles.priceContainer}>
          <span className="text text_type_main-default mr-2">2 x 20</span>{" "}
          <CurrencyIcon type="primary" />
        </p>
      </p>
    </div>
  );
};

export default OrderDetails;
