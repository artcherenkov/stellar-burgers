import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./app-header.module.css";

const AppHeader = () => (
  <header className={cn(styles.root)}>
    <div className={styles.container}>
      <div className={styles.linksContainer}>
        <Link className={styles.logo} to="/">
          <Logo />
        </Link>
        <Link className={cn(styles.link, styles.link_active)} to="/">
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default ml-2">Конструктор</p>
        </Link>
        <Link className={styles.link} to="/feed">
          <ListIcon type="secondary" />
          <p className="text text_type_main-default ml-2">Лента заказов</p>
        </Link>
        <Link className={cn(styles.link, styles.link_right)} to="/profile">
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </Link>
      </div>
    </div>
  </header>
);

export default AppHeader;
