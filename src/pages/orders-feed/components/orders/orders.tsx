import styles from "./orders.module.css";
import FeedCard from "../../../../components/feed-card/feed-card";
import cn from "classnames";

const Orders = () => {
  return (
    <div className={styles.orders}>
      <ul className={cn(styles.list, "custom-scroll")}>
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </ul>
    </div>
  );
};

export default Orders;
