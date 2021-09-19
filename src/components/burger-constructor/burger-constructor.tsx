import cn from "classnames";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Ingredient from "./components/ingredient/ingredient";
import { TIngredient } from "../burger-ingredients/burger-ingredients";

interface IBurgerConstructor {
  bun: TIngredient;
  main: TIngredient[];
  onIngredientClick: (id: string) => void;
}

const countPrice = (bun: TIngredient, main: TIngredient[]) => {
  return main
    .map((ing) => ing.price)
    .reduce((ing, acc) => {
      acc = acc + ing;
      return acc;
    }, bun.price);
};

const BurgerConstructor = (props: IBurgerConstructor) => (
  <section className={cn(styles.root, "ml-10")}>
    <div
      className={cn(
        styles.ingredientContainer,
        styles.ingredientContainer_outter
      )}
      onClick={() => props.onIngredientClick(props.bun._id)}
    >
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${props.bun.name} (верх)`}
        price={props.bun.price}
        thumbnail={props.bun.image}
      />
    </div>
    <ul className={cn(styles.list, "custom-scroll")}>
      {props.main.map((item, idx) => (
        <li className={styles.item} key={`${item._id}-${idx}`}>
          <Ingredient
            {...item}
            onClick={() => props.onIngredientClick(item._id)}
          />
        </li>
      ))}
    </ul>
    <div
      className={cn(
        styles.ingredientContainer,
        styles.ingredientContainer_outter
      )}
      onClick={() => props.onIngredientClick(props.bun._id)}
    >
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${props.bun.name} (низ)`}
        price={props.bun.price}
        thumbnail={props.bun.image}
      />
    </div>

    <div className={cn(styles.results, "mt-10")}>
      <p className={cn(styles.totalCost, "mr-10")}>
        <span className="text text_type_digits-medium mr-2">
          {countPrice(props.bun, props.main)}
        </span>
        <CurrencyIcon type="primary" />
      </p>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  </section>
);

export default BurgerConstructor;
