import { useMemo } from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Link, useHistory } from "react-router-dom";
import styles from "./app-header.module.css";

const AppHeader = () => {
  const history = useHistory();

  const pathname = useMemo(() => history.location.pathname, [history.location]);

  return (
    <header className={cn(styles.root)}>
      <div className={styles.container}>
        <div className={styles.linksContainer}>
          <Link className={styles.logo} to="/">
            <Logo />
          </Link>
          <Link
            className={cn(styles.link, {
              [styles.link_active]: pathname === "/",
            })}
            to="/"
          >
            <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </Link>
          <Link
            className={cn(styles.link, {
              [styles.link_active]: pathname === "/feed-card",
            })}
            to="/feed"
          >
            <ListIcon type={pathname === "/feed-card" ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </Link>
          <Link
            className={cn(styles.link, styles.link_right, {
              [styles.link_active]: pathname === "/profile",
            })}
            to="/profile"
          >
            <ProfileIcon
              type={pathname === "/profile" ? "primary" : "secondary"}
            />
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
