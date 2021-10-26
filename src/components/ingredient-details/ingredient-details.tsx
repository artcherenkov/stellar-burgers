import cn from "classnames";
import { TIngredient } from "../app/app.typed";
import styles from "../modal/modal.module.css";
import NutritionFacts from "./components/nutrition-facts/nutrition-facts";

interface IIngredientDetails {
  ingredient: TIngredient;
}

const IngredientDetails = ({ ingredient }: IIngredientDetails) => {
  return (
    <div>
      <h1
        style={{ textAlign: "center" }}
        className={"text text_type_main-large pt-3 pb-3"}
      >
        Детали ингредиента
      </h1>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <h2 className={cn("text text_type_main-medium pt-2 pb-8", styles.title)}>
        {ingredient.name}
      </h2>
      <NutritionFacts {...ingredient} />
    </div>
  );
};

export default IngredientDetails;
