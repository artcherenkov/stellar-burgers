import styles from "../../../burger-ingredients/burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { TIngredient } from "../../../burger-ingredients/burger-ingredients";

const Ingredient = (props: TIngredient) => (
  <div className={styles.burgerIngredient}>
    <img className="pr-4 pl-4 mb-1" src={props.image} alt={props.name} />
    <p className={styles.ingredientCost}>
      <span className="text text_type_digits-default mr-2">{props.price}</span>{" "}
      <CurrencyIcon type="primary" />
    </p>
    <h3 className={cn(styles.ingredientTitle, "text text_type_main-default")}>
      {props.name}
    </h3>
  </div>
);

export default Ingredient;