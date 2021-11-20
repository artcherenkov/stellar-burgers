import styles from "./profile-sidebar.module.css";
import cn from "classnames";
import { useAppDispatch } from "../../services/hooks";
import { logout } from "../../services/slices/user";

const ProfileSidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => dispatch(logout());

  return (
    <aside className={styles.root}>
      <ul className={styles.tabs}>
        <li>
          <p className="text text_type_main-medium pt-4 pb-4">Профиль</p>
        </li>
        <li>
          <p className="text text_type_main-medium text_color_inactive pt-4 pb-4">
            История заказов
          </p>
        </li>
        <li>
          <button
            onClick={handleLogoutClick}
            className={cn(
              styles.button,
              "text text_type_main-medium text_color_inactive pt-4 pb-4"
            )}
          >
            Выход
          </button>
        </li>
      </ul>
      <p className="text text_type_main-default text_color_inactive mt-20">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
  );
};

export default ProfileSidebar;
