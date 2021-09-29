import cn from "classnames";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Ingredient from "./components/ingredient/ingredient";
import React, { useState } from "react";
import { postOrder } from "../../utils/api";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { IConstructorState, TIngredient } from "../app/app.typed";

interface IBurgerConstructor {
  onIngredientClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  constructorState: IConstructorState;
}

const DEFAULT_ORDER_DETAILS = {
  name: "",
  order: {
    number: -1,
  },
  success: false,
};

const ANIMATION_DURATION = 300; // мс

const BurgerConstructor = (props: IBurgerConstructor) => {
  const { constructorState } = props;

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

  const getIngredientsIds = (ingredients: TIngredient[]) =>
    ingredients.map((i) => i._id);

  const onOrderSubmit = () => {
    if (!constructorState.bun) {
      return;
    }

    const ingredientsIds = getIngredientsIds([
      constructorState.bun,
      ...constructorState.mains,
    ]);

    setIsLoading(true);
    postOrder({ ingredients: ingredientsIds })
      .then((data) => {
        setOrderDetails(data);
        setIsPopupOpen(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const onBunClick = () => {
    if (constructorState.bun) {
      props.onIngredientClick(constructorState.bun._id);
    }
  };

  return (
    <section className={cn(styles.root, "ml-10")}>
      {constructorState.bun && (
        <div
          className={cn(
            styles.ingredientContainer,
            styles.ingredientContainer_outter
          )}
          onClick={onBunClick}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${constructorState.bun.name} (верх)`}
            price={constructorState.bun.price}
            thumbnail={constructorState.bun.image}
          />
        </div>
      )}
      <ul className={cn(styles.list, "custom-scroll")}>
        {constructorState.mains.map((item, idx) => (
          <li className={styles.item} key={`${item._id}-${idx}`}>
            <Ingredient
              {...item}
              onDeleteClick={() => props.onDeleteClick(item._id)}
              onClick={() => {
                props.onIngredientClick(item._id);
              }}
            />
          </li>
        ))}
      </ul>
      {constructorState.bun && (
        <div
          className={cn(
            styles.ingredientContainer,
            styles.ingredientContainer_outter
          )}
          onClick={onBunClick}
        >
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${constructorState.bun.name} (низ)`}
            price={constructorState.bun.price}
            thumbnail={constructorState.bun.image}
          />
        </div>
      )}

      <div className={cn(styles.results, "mt-10")}>
        <p className={cn(styles.totalCost, "mr-10")}>
          <span className="text text_type_digits-medium mr-2">
            {constructorState.price}
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
