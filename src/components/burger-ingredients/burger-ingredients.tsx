import { useState } from "react";
import cn from "classnames";
import {
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";

const Type = {
  BUN: "BUN",
  SAUCE: "SAUCE",
  FILLING: "FILLING",
};

const BurgerIngredients = () => {
  const [current, setCurrent] = useState(Type.BUN);
  const onTabClick = (value: string) => setCurrent(value);

  return (
    <section className={styles.root}>
      <h1 className={cn(styles.title, "text text_type_main-large")}>
        Соберите бургер
      </h1>
      <div className="mb-10" style={{ display: "flex" }}>
        <Tab
          value={Type.BUN}
          active={current === Type.BUN}
          onClick={onTabClick}
        >
          Булки
        </Tab>
        <Tab
          value={Type.SAUCE}
          active={current === Type.SAUCE}
          onClick={onTabClick}
        >
          Соусы
        </Tab>
        <Tab
          value={Type.FILLING}
          active={current === Type.FILLING}
          onClick={onTabClick}
        >
          Начинки
        </Tab>
      </div>
        <div className={cn(styles.ingredientsContainer, "custom-scroll")}>
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <ul className={styles.ingredientsList}>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
          </ul>
          <h2 className="text text_type_main-medium mb-6">Соусы</h2>
          <ul className={styles.ingredientsList}>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
          </ul>
          <h2 className="text text_type_main-medium mb-6">Начинки</h2>
          <ul className={styles.ingredientsList}>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src="https://code.s3.yandex.net/react/code/bun-02.png"
                  alt="Краторная булка N-200i"
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">20</span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  Краторная булка N-200i булка N-200i
                </h3>
              </div>
            </li>
          </ul>
        </div>
    </section>
  );
};

export default BurgerIngredients;
