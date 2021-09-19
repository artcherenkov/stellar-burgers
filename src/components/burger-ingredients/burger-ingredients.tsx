import { useEffect, useState } from "react";
import cn from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import Ingredient from "./components/ingredient/ingredient";

export type TIngredient = {
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

const Type = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};
const API_URL = "https://norma.nomoreparties.space/api/ingredients";

const sortIngredientsByType = (data: TIngredient[]) => {
  const buns = data.filter((i) => i.type === Type.BUN);
  const mains = data.filter((i) => i.type === Type.MAIN);
  const sauces = data.filter((i) => i.type === Type.SAUCE);
  return { buns, mains, sauces };
};

const BurgerIngredients = () => {
  const [current, setCurrent] = useState(Type.BUN);
  const [data, setData] =
    useState<null | { [key: string]: TIngredient[] }>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(({ data }) => setData(sortIngredientsByType(data)))
      .catch((err) => console.log(err));
  }, []);

  const onTabClick = (value: string) => setCurrent(value);

  if (!data) {
    return <p>Загрузка...</p>;
  }

  const { buns, mains, sauces } = data;

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
        <a className={styles.tabLink} href={`#${Type.BUN}`}>
          <Tab
            value={Type.BUN}
            active={current === Type.BUN}
            onClick={onTabClick}
          >
            Булки
          </Tab>
        </a>
        <a className={styles.tabLink} href={`#${Type.SAUCE}`}>
          <Tab
            value={Type.SAUCE}
            active={current === Type.SAUCE}
            onClick={onTabClick}
          >
            Соусы
          </Tab>
        </a>

        <a className={styles.tabLink} href={`#${Type.MAIN}`}>
          <Tab
            value={Type.MAIN}
            active={current === Type.MAIN}
            onClick={onTabClick}
          >
            Начинки
          </Tab>
        </a>
      </div>
      <div className={cn(styles.ingredientsContainer, "custom-scroll")}>
        <h2 id={Type.BUN} className="text text_type_main-medium mb-6">
          Булки
        </h2>
        <ul className={styles.ingredientsList}>{buns.map(renderIngredient)}</ul>
        <h2 id={Type.SAUCE} className="text text_type_main-medium mb-6">
          Соусы
        </h2>
        <ul className={styles.ingredientsList}>
          {sauces.map(renderIngredient)}
        </ul>
        <h2 className="text text_type_main-medium mb-6">Начинки</h2>
        <ul id={Type.MAIN} className={styles.ingredientsList}>
          {mains.map(renderIngredient)}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
