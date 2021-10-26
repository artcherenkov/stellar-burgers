import styles from "./profile-sidebar.module.css";

const ProfileSidebar = () => {
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
          <p className="text text_type_main-medium text_color_inactive pt-4 pb-4">
            Выход
          </p>
        </li>
      </ul>
      <p className="text text_type_main-default text_color_inactive mt-20">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
  );
};

export default ProfileSidebar;
