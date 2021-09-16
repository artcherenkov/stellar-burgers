import cn from "classnames";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => (
  <section className={cn(styles.root, "ml-10")}>
    <ul className={cn(styles.list, "custom-scroll")}>
      <li className={styles.item}>
        <div className={styles.ingredientContainer}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </li>
      <li className={styles.item}>
        <button className={styles.button}>
          <DragIcon type="primary" />
        </button>
        <div className={styles.ingredientContainer}>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </li>
      <li className={styles.item}>
        <button className={styles.button}>
          <DragIcon type="primary" />
        </button>
        <div className={styles.ingredientContainer}>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </li>
      <li className={styles.item}>
        <button className={styles.button}>
          <DragIcon type="primary" />
        </button>
        <div className={styles.ingredientContainer}>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </li>
      <li className={styles.item}>
        <button className={styles.button}>
          <DragIcon type="primary" />
        </button>
        <div className={styles.ingredientContainer}>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </li>
      <li className={styles.item}>
        <button className={styles.button}>
          <DragIcon type="primary" />
        </button>
        <div className={styles.ingredientContainer}>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </li>
      <li className={styles.item}>
        <button className={styles.button}>
          <DragIcon type="primary" />
        </button>
        <div className={styles.ingredientContainer}>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </li>
      <li className={styles.item}>
        <button className={styles.button}>
          <DragIcon type="primary" />
        </button>
        <div className={styles.ingredientContainer}>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </li>
      <li className={styles.item}>
        <button className={styles.button}>
          <DragIcon type="primary" />
        </button>
        <div className={styles.ingredientContainer}>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </li>
      <li className={styles.item}>
        <div className={styles.ingredientContainer}>
          <ConstructorElement
            type="bottom"
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </li>
    </ul>
    <div className={cn(styles.results, "mt-10")}>
      <p className={cn(styles.totalCost, "mr-10")}>
        <span className="text text_type_digits-medium mr-2">610</span>
        <CurrencyIcon type="primary" />
      </p>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  </section>
);

export default BurgerConstructor;
