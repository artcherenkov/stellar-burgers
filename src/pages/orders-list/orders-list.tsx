import React, { useEffect } from "react";
import ProfileSidebar from "../../components/profile-sidebar/profile-sidebar";
import Layout from "../../components/layout/layout";

import styles from "./orders-list.module.css";
import Order from "./components/order/order";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { selectIsAuthenticated } from "../../services/slices/user";
import {
  WS_ORDER_ACTIONS,
  selectOrders,
} from "../../services/slices/ws-orders";
import { useModifyOrders } from "../../hooks/useModifyOrders";

export const CONTAINER_STYLE = {
  maxWidth: 1280,
  padding: "0 40px",
  display: "flex",
  margin: "120px auto 0",
};

const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const orders = useAppSelector(selectOrders);

  useModifyOrders();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: WS_ORDER_ACTIONS.wsInitWithToken });
    }

    return () => {
      dispatch({ type: WS_ORDER_ACTIONS.wsClose });
    };
  }, [isAuthenticated]);

  return (
    <Layout>
      <div style={CONTAINER_STYLE}>
        <ProfileSidebar />
        <div className={styles.root}>
          <ul className={cn(styles.list, "custom-scroll")}>
            {orders?.map((o) => (
              <Order key={o._id} data={o} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersList;
