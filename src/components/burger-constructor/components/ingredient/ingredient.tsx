import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../burger-ingredients/burger-ingredients";
import styles from "../../burger-constructor.module.css";

const Ingredient = (props: TIngredient) => (
  <>
    <button className={styles.button}>
      <DragIcon type="primary" />
    </button>
    <div className={styles.ingredientContainer}>
      <ConstructorElement
        text={props.name}
        price={props.price}
        thumbnail={props.image}
      />
    </div>
  </>
);

export default Ingredient;
