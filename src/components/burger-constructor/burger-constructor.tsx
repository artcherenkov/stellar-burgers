import cn from "classnames";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Ingredient from "./components/ingredient/ingredient";
import { TIngredient } from "../burger-ingredients/burger-ingredients";
import { Type } from "../app/app";
import React, { useContext, useMemo, useState } from "react";
import IngredientsContext from "../../context/IngredientsContext";
import { postOrder } from "../../utils/api";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

interface IBurgerConstructor {
  onIngredientClick: (id: string) => void;
}

const MOCK_SAUCES_COUNT = 2;
const MOCK_MAINS_COUNT = 2;

export const getMockIngredientsSet = (ingredients: TIngredient[]) => {
  const bun = ingredients.find((i) => i.type === Type.BUN)!;
  const sauces = ingredients
    .filter((i) => i.type === Type.SAUCE)
    .slice(0, MOCK_SAUCES_COUNT);
  const mains = ingredients
    .filter((i) => i.type === Type.MAIN)
    .slice(0, MOCK_MAINS_COUNT);

  return { bun, mains: [sauces[0], ...mains, sauces[1]] };
};

const DEFAULT_ORDER_DETAILS = {
  name: "",
  order: {
    number: -1,
  },
  success: false,
};

const ANIMATION_DURATION = 300; // мс

const BurgerConstructor = (props: IBurgerConstructor) => {
  const initialIngredients = useContext(IngredientsContext);
  const mockIngredientsSet = getMockIngredientsSet(initialIngredients);

  const { bun, mains } = mockIngredientsSet;
  const [ingredients, setIngredients] = useState([...mains]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(DEFAULT_ORDER_DETAILS);
  const onClosePopup = () => {
    setIsPopupOpen(false);
    // очистить поля после плавного закрытия попапа
    setTimeout(
      () => setOrderDetails(DEFAULT_ORDER_DETAILS),
      ANIMATION_DURATION
    );
  };

  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = useMemo(() => {
    return ingredients
      .map((ing) => ing.price)
      .reduce((ing, acc) => {
        acc = acc + ing;
        return acc;
      }, bun.price);
  }, [bun, ingredients]);

  const getIngredientsIds = (ingredients: TIngredient[]) =>
    ingredients.map((i) => i._id);

  const onOrderSubmit = () => {
    const ingredientsIds = getIngredientsIds([bun, ...ingredients]);
    setIsLoading(true);
    postOrder({ ingredients: ingredientsIds })
      .then((data) => {
        setOrderDetails(data);
        setIsPopupOpen(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={cn(styles.root, "ml-10")}>
      <div
        className={cn(
          styles.ingredientContainer,
          styles.ingredientContainer_outter
        )}
        onClick={() => props.onIngredientClick(bun._id)}
      >
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={cn(styles.list, "custom-scroll")}>
        {ingredients.map((item, idx) => (
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
        onClick={() => props.onIngredientClick(bun._id)}
      >
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <div className={cn(styles.results, "mt-10")}>
        <p className={cn(styles.totalCost, "mr-10")}>
          <span className="text text_type_digits-medium mr-2">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large" onClick={onOrderSubmit}>
          {isLoading ? "Загрузка..." : "Оформить заказ"}
        </Button>
      </div>

      <Modal open={isPopupOpen} onClose={onClosePopup}>
        <OrderDetails {...orderDetails} />
      </Modal>
    </section>
  );
};

export default BurgerConstructor;
