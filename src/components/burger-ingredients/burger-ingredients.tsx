import { useState } from "react";
import cn from "classnames";
import {
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { MOCKS } from "../../utils/data";

import styles from "./burger-ingredients.module.css";

const Type = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};

type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

const sortIngredientsByType = (data: TIngredient[]) => {
  const buns = data.filter((i) => i.type === Type.BUN);
  const mains = data.filter((i) => i.type === Type.MAIN);
  const sauces = data.filter((i) => i.type === Type.SAUCE);
  return { buns, mains, sauces };
};

const BurgerIngredients = () => {
  const [current, setCurrent] = useState(Type.BUN);
  const onTabClick = (value: string) => setCurrent(value);

  const { buns, mains, sauces } = sortIngredientsByType(MOCKS);

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
          value={Type.MAIN}
          active={current === Type.MAIN}
          onClick={onTabClick}
        >
          Начинки
        </Tab>
      </div>
      <div className={cn(styles.ingredientsContainer, "custom-scroll")}>
        <h2 className="text text_type_main-medium mb-6">Булки</h2>
        <ul className={styles.ingredientsList}>
          {buns.map((item) => (
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src={item.image}
                  alt={item.name}
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">
                    {item.price}
                  </span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  {item.name}
                </h3>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6">Соусы</h2>
        <ul className={styles.ingredientsList}>
          {sauces.map((item) => (
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src={item.image}
                  alt={item.name}
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">
                    {item.price}
                  </span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  {item.name}
                </h3>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="text text_type_main-medium mb-6">Начинки</h2>
        <ul className={styles.ingredientsList}>
          {mains.map((item) => (
            <li className={styles.ingredientsItem}>
              <div className={styles.burgerIngredient}>
                <img
                  className="pr-4 pl-4 mb-1"
                  src={item.image}
                  alt={item.name}
                />
                <p className={styles.ingredientCost}>
                  <span className="text text_type_digits-default mr-2">
                    {item.price}
                  </span>{" "}
                  <CurrencyIcon type="primary" />
                </p>
                <h3
                  className={cn(
                    styles.ingredientTitle,
                    "text text_type_main-default"
                  )}
                >
                  {item.name}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
