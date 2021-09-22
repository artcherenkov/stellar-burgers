import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../burger-ingredients/burger-ingredients";
import styles from "../../burger-constructor.module.css";

interface IIngredient extends TIngredient {
  onClick: () => void;
}

const Ingredient = (props: IIngredient) => (
  <>
    <button className={styles.button}>
      <DragIcon type="primary" />
    </button>
    <div className={styles.ingredientContainer} onClick={props.onClick}>
      <ConstructorElement
        text={props.name}
        price={props.price}
        thumbnail={props.image}
      />
    </div>
  </>
);

export default Ingredient;
