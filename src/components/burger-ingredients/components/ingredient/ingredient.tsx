import styles from "../../burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { TIngredient } from "../../../app/app.typed";
import { openDetailsPopup } from "../../../../services/ingredientsSlice";
import { useAppDispatch } from "../../../../services/hooks";

interface IIngredient extends TIngredient {
  onClick: () => void;
}

const Ingredient = (props: IIngredient) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(openDetailsPopup(props._id));
    props.onClick();
  };

  return (
    <div className={styles.burgerIngredient} onClick={onClick}>
      <img className="pr-4 pl-4 mb-1" src={props.image} alt={props.name} />
      <p className={styles.ingredientCost}>
        <span className="text text_type_digits-default mr-2">
          {props.price}
        </span>{" "}
        <CurrencyIcon type="primary" />
      </p>
      <h3 className={cn(styles.ingredientTitle, "text text_type_main-default")}>
        {props.name}
      </h3>
    </div>
  );
};

export default Ingredient;
