import React, { useState } from "react";
import cn from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import Ingredient from "./components/ingredient/ingredient";
import { IngredientType, TIngredient } from "../app/app.typed";
import { useAppSelector } from "../../services/hooks";
import { selectIngredients } from "../../services/ingredientsSlice";

const sortIngredientsByType = (data: TIngredient[]) => {
  const buns = data.filter((i) => i.type === IngredientType.BUN);
  const mains = data.filter((i) => i.type === IngredientType.MAIN);
  const sauces = data.filter((i) => i.type === IngredientType.SAUCE);
  return { buns, mains, sauces };
};

const BurgerIngredients = () => {
  const ingredients = useAppSelector(selectIngredients);

  const [current, setCurrent] = useState(IngredientType.BUN);
  const { buns, mains, sauces } = sortIngredientsByType(ingredients);

  const onTabClick = (value: string) => setCurrent(value);

  const renderIngredient = (item: TIngredient) => (
    <li className={styles.ingredientsItem} key={item._id}>
      <Ingredient {...item} />
    </li>
  );

  return (
    <section className={styles.root}>
      <h1 className={cn(styles.title, "text text_type_main-large")}>
        Соберите бургер
      </h1>
      <div className="mb-10" style={{ display: "flex" }}>
        <a className={styles.tabLink} href={`#${IngredientType.BUN}`}>
          <Tab
            value={IngredientType.BUN}
            active={current === IngredientType.BUN}
            onClick={onTabClick}
          >
            Булки
          </Tab>
        </a>
        <a className={styles.tabLink} href={`#${IngredientType.SAUCE}`}>
          <Tab
            value={IngredientType.SAUCE}
            active={current === IngredientType.SAUCE}
            onClick={onTabClick}
          >
            Соусы
          </Tab>
        </a>

        <a className={styles.tabLink} href={`#${IngredientType.MAIN}`}>
          <Tab
            value={IngredientType.MAIN}
            active={current === IngredientType.MAIN}
            onClick={onTabClick}
          >
            Начинки
          </Tab>
        </a>
      </div>
      <div className={cn(styles.ingredientsContainer, "custom-scroll")}>
        <h2 id={IngredientType.BUN} className="text text_type_main-medium mb-6">
          Булки
        </h2>
        <ul className={styles.ingredientsList}>{buns.map(renderIngredient)}</ul>
        <h2
          id={IngredientType.SAUCE}
          className="text text_type_main-medium mb-6"
        >
          Соусы
        </h2>
        <ul className={styles.ingredientsList}>
          {sauces.map(renderIngredient)}
        </ul>
        <h2 className="text text_type_main-medium mb-6">Начинки</h2>
        <ul id={IngredientType.MAIN} className={styles.ingredientsList}>
          {mains.map(renderIngredient)}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
