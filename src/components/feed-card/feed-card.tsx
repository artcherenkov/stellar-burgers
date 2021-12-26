import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImage from "./components/ingredient-image/ingredient-image";
import styles from "./feed-card.module.css";

const FeedCard = () => {
  return (
    <li className={styles.card}>
      <p className={cn(styles.header, "text text_type_digits-default")}>
        #034535{" "}
        <time className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </time>
      </p>
      <h2 className={cn(styles.title, "text text_type_main-medium")}>
        Death Star Starship Main бургер
      </h2>
      <div className={styles.priceInfo}>
        <ul className={styles.ingredientsList}>
          <IngredientImage src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
          <IngredientImage src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
          <IngredientImage src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
          <IngredientImage src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
        </ul>
        <p className={cn(styles.priceContainer)}>
          <span className={cn(styles.price, "text text_type_digits-default")}>
            480
          </span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </li>
  );
};

export default FeedCard;
