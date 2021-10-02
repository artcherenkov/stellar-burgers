import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientWithCount } from "../../../app/app.typed";
import styles from "../../burger-constructor.module.css";
import {
  deleteIngredient,
  openDetailsPopup,
  setDragging,
  swapIngredients,
} from "../../../../services/slices/ingredients";
import { useAppDispatch } from "../../../../services/hooks";
import { useOnIngredientClick } from "./ingredient.utils";
import cn from "classnames";
import { useDrag, useDrop } from "react-dnd";
import { useEffect } from "react";

interface IIngredient extends TIngredientWithCount {
  bun?: boolean;
  position?: "top" | "bottom";
}

const Ingredient = (props: IIngredient) => {
  const dispatch = useAppDispatch();

  const onDeleteClick = () => dispatch(deleteIngredient(props._id));
  const onIngredientClick = () => dispatch(openDetailsPopup(props._id));
  const { containerRef, onClick } = useOnIngredientClick(onIngredientClick);

  const [{ opacity, isDragging }, ref] = useDrag({
    type: "ingredient",
    item: { id: props._id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isHover, target }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      target: monitor.getItem(),
    }),
    drop() {
      dispatch(setDragging(""));
    },
  });

  useEffect(() => {
    if (isDragging) {
      dispatch(setDragging(props._id));
    }
  }, [isDragging]);

  useEffect(() => {
    if (isHover && target.id !== props._id) {
      dispatch(swapIngredients(props._id));
    }
  }, [isHover, target]);

  if (props.bun && props.position) {
    const position = props.position === "top" ? " (верх)" : " (низ)";

    return (
      <div
        className={cn(
          styles.ingredientContainer,
          styles.ingredientContainer_outter
        )}
      >
        <ConstructorElement
          type="top"
          isLocked={true}
          text={props.name + position}
          price={props.price}
          thumbnail={props.image}
        />
      </div>
    );
  }

  return (
    <li
      style={{
        marginBottom: 16,
      }}
      ref={dropTarget}
    >
      <div className={styles.item} ref={ref}>
        <button className={styles.button}>
          <DragIcon type="primary" />
        </button>
        <div
          className={styles.ingredientContainer}
          onClick={onClick}
          ref={containerRef}
          style={{ opacity }}
        >
          <ConstructorElement
            text={
              props.count < 2 ? props.name : `${props.name} x${props.count}`
            }
            price={props.price}
            thumbnail={props.image}
            handleClose={onDeleteClick}
          />
        </div>
      </div>
    </li>
  );
};

export default Ingredient;
