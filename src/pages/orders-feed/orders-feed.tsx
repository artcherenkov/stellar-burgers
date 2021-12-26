import Layout from "../../components/layout/layout";

import Orders from "./components/orders/orders";
import Stats from "./components/stats/stats";

import styles from "./orders-feed.module.css";

const OrdersFeed = () => {
  return (
    <Layout>
      <div className={styles.root}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={styles.content}>
          <Orders />
          <Stats />
        </div>
      </div>
    </Layout>
  );
};

export default OrdersFeed;
