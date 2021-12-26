import cn from "classnames";
import styles from "./stats.module.css";

const Stats = () => {
  return (
    <div className={styles.stats}>
      <div className={styles.ordersStatuses}>
        <div className={styles.ordersStatus}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={styles.idsList}>
            <li
              className={cn(
                styles.orderId,
                styles.orderId_highlight,
                "text text_type_digits-default"
              )}
            >
              034533
            </li>
            <li
              className={cn(
                styles.orderId,
                styles.orderId_highlight,
                "text text_type_digits-default"
              )}
            >
              034533
            </li>
            <li
              className={cn(
                styles.orderId,
                styles.orderId_highlight,
                "text text_type_digits-default"
              )}
            >
              034533
            </li>
            <li
              className={cn(
                styles.orderId,
                styles.orderId_highlight,
                "text text_type_digits-default"
              )}
            >
              034533
            </li>
          </ul>
        </div>
        <div className={styles.ordersStatus}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={styles.idsList}>
            <li className={cn(styles.orderId, "text text_type_digits-default")}>
              034538
            </li>
            <li className={cn(styles.orderId, "text text_type_digits-default")}>
              034538
            </li>
            <li className={cn(styles.orderId, "text text_type_digits-default")}>
              034538
            </li>
            <li className={cn(styles.orderId, "text text_type_digits-default")}>
              034538
            </li>
            <li className={cn(styles.orderId, "text text_type_digits-default")}>
              034538
            </li>
            <li className={cn(styles.orderId, "text text_type_digits-default")}>
              034538
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.globalStats}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <span className={cn(styles.stat, "text text_type_digits-large")}>
          28 752
        </span>
      </div>
      <div className={styles.globalStats}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <span className={cn(styles.stat, "text text_type_digits-large")}>
          138
        </span>
      </div>
    </div>
  );
};

export default Stats;
