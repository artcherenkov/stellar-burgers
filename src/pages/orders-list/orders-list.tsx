import React from "react";
import ProfileSidebar from "../../components/profile-sidebar/profile-sidebar";
import Layout from "../../components/layout/layout";

import styles from "./orders-list.module.css";
import Order from "./components/order/order";
import cn from "classnames";

export const CONTAINER_STYLE = {
  maxWidth: 1280,
  padding: "0 40px",
  display: "flex",
  margin: "120px auto 0",
};

const OrdersList: React.FC = () => {
  return (
    <Layout>
      <div style={CONTAINER_STYLE}>
        <ProfileSidebar />
        <div className={styles.root}>
          <ul className={cn(styles.list, "custom-scroll")}>
            <Order />
            <Order />
            <Order />
            <Order />
            <Order />
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersList;
